document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-zobrazit');
  const select = document.getElementById('znameni');
  const vystup = document.getElementById('horoskop-vystup');

  btn.addEventListener('click', async () => {
    const znameni = select.value;

    if (!znameni) {
      vystup.textContent = "Prosím vyber své znamení.";
      return;
    }

    try {
      const response = await fetch('json/denni-horoskop.json');

      if (!response.ok) {
        throw new Error('Soubor s horoskopem nelze načíst.');
      }

      const data = await response.json();

      const dnes = new Date().toISOString().split('T')[0]; // např. "2025-08-05"
      const horoskop = data[znameni]?.[dnes];

      if (!horoskop) {
        vystup.textContent = "Horoskop pro zvolené znamení na dnešní den nebyl nalezen.";
        return;
      }

      let text = '';
      for (const [kategorie, obsah] of Object.entries(horoskop)) {
        text += `
          <div class="horoskop-blok">
            <p><strong>${kategorie}:</strong></p>
            <p>${obsah}</p>
          </div>
        `;
      }

      vystup.innerHTML = text.trim();

    } catch (err) {
      vystup.textContent = `Chyba při načítání horoskopu: ${err.message}`;
    }
  });
});
