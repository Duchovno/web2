// -----------------------------
// Konfigurace EmailJS (vyplň si)
// -----------------------------
const EMAILJS_PUBLIC_KEY = "pOWpwIv-ydhiVC4xI";
const EMAILJS_SERVICE_ID = "service_0zno8xf";

// Inic EmailJS (pokud knihovna existuje a chceš posílat hned)
if (window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Hamburger menu
  // -----------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // -----------------------------
  // FAQ akordeon
  // -----------------------------
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((q) => {
    const item = q.parentElement;

    // ARIA
    q.setAttribute("role", "button");
    q.setAttribute("tabindex", "0");
    q.setAttribute("aria-expanded", "false");

    const toggle = () => {
      const isOpen = item.classList.contains("open");

      // Zavři ostatní
      document.querySelectorAll(".faq-item.open").forEach((opened) => {
        if (opened !== item) {
          opened.classList.remove("open");
          const btn = opened.querySelector(".faq-question");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      // Otevři / zavři aktuální
      item.classList.toggle("open", !isOpen);
      q.setAttribute("aria-expanded", String(!isOpen));
    };

    q.addEventListener("click", toggle);
    q.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  // -----------------------------
  // Formulář – univerzální handler
  // -----------------------------
  const form = document.getElementById("order-form");
  const statusEl = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Honeypot
      if (form.website && form.website.value) return;

      const vyklad_type = (form.vyklad_type && form.vyklad_type.value) || "neznamy";
      const name = (form.name && form.name.value.trim()) || "";
      const email = (form.email && form.email.value.trim()) || "";

      // u jednoduchého výkladu je question1, u dalších můžeš přidat question2..question5
      const question1 = (form.question1 && form.question1.value.trim()) || "";
      const question2 = form.question2 ? form.question2.value.trim() : "";
      const question3 = form.question3 ? form.question3.value.trim() : "";
      const question4 = form.question4 ? form.question4.value.trim() : "";
      const question5 = form.question5 ? form.question5.value.trim() : "";

      const termsOk = form.terms ? form.terms.checked : true;
      const gdprOk = form.gdpr ? form.gdpr.checked : true;

      if (!name || !email || !question1 || !termsOk || !gdprOk) {
        setStatus("Vyplň prosím všechna povinná pole a zaškrtni souhlasy.", "error");
        return;
      }

      setStatus("Odesílám…", "info");

      const templateParams = {
        vyklad: vyklad_type,
        name,
        email,
        question1,
        question2,
        question3,
        question4,
        question5,
      };

      // Pokud nechceš hned posílat přes EmailJS, můžeš to tady zatím jen logovat:
      // console.log("Data k odeslání:", templateParams);

      if (!window.emailjs) {
        // fallback dummy režim
        setTimeout(() => {
          setStatus(`Díky, ${name}! Objednávka byla uložena.`, "success");
          form.reset();
        }, 800);
        return;
      }

      try {
  // 1) Pošli zákazníkovi (template_3qhk5v4)
  await emailjs.send(EMAILJS_SERVICE_ID, "template_3qhk5v4", templateParams);

  // 2) Pošli sobě (template_s62v8c6)
  await emailjs.send(EMAILJS_SERVICE_ID, "template_s62v8c6", templateParams);

  setStatus(`Díky, ${name}! Objednávka byla odeslána. Brzy se ozvu.`, "success");
  form.reset();
} catch (err) {
  console.error(err);
  setStatus("Něco se pokazilo. Zkus to prosím znovu nebo mi napiš e‑mailem.", "error");
}

     
    });
  }

  function setStatus(msg, type = "info") {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = `form-status ${type}`;
  }
});
