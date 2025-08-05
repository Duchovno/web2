const introText = document.getElementById('intro-text');
const cardContainer = document.getElementById('card-container');
const tarotCard = document.getElementById('tarot-card');
const cardFront = document.getElementById('card-front');
const meaningText = document.getElementById('meaning');

const tarotCards = [
  {
    name: "Blázen",
    image: "images/karty/00-the-fool.jpg",
    meaning: "Dnešek ti přináší šanci začít znovu, s čistou myslí a otevřeným srdcem. Můžeš vykročit mimo zajeté koleje. Bez předsudků, bez zbytečných obav. Věř, že i cesta bez mapy může vést k něčemu zásadnímu."
  },
  {
    name: "Mág",
    image: "images/karty/01-the-magician.jpg",
    meaning: "Dnes držíš ve svých rukou moc tvořit. Myšlenky, které nosíš v hlavě, mají sílu se proměnit v realitu. Využij své schopnosti vědomě. Příležitosti jsou blíž, než si myslíš. Je čas jednat."
  },
  {
    name: "Velekněžka",
    image: "images/karty/02-the-high-priestess.jpg",
    meaning: "Vnitřní ticho dnes řekne víc než hluk světa. Intuice, sny, náznaky. Tomu dnes věnuj pozornost. Nejde o to, co slyšíš, ale co cítíš. To co se skrývá pod povrchem. Důvěřuj vnitřní moudrosti."
  },
  {
    name: "Císařovna",
    image: "images/karty/03-the-empress.jpg",
    meaning: "Tvé vnitřní i vnější já dnes volá po péči. Možná něco roste. Vztah, nápad, ty sám/sama. Dej tomu prostor a výživu. Energie dne přeje laskavosti, kreativitě a napojení na život."
  },
  {
    name: "Císař",
    image: "images/karty/04-the-emperor.jpg",
    meaning: "Dnes je čas vzít věci do vlastních rukou a postavit je na pevný základ. Jasné hranice, rozhodnost a vize ti přinesou klid a směr. Můžeš být oporou sobě i ostatním."
  },
  {
    name: "Velekněz",
    image: "images/karty/05-pope.jpg",
    meaning: "Zastav se a zeptej se: Čemu věřím? Dnešek přináší možnost spojit se s hlubším smyslem nebo moudrostí, která přesahuje jednotlivce. Někdy není třeba hledat nové cesty. Stačí důvěřovat těm, které fungují."
  },
  {
    name: "Zamilovaní",
    image: "images/karty/06-the-lovers.jpg",
    meaning: "Energie dne klade důraz na volbu. Nejen mezi „ano“ a „ne“, ale mezi tím, co s tebou ladí a co už ne. Odpovědi najdeš v sobě, ne ve vnějším světě. Ať už jde o vztah, hodnoty nebo směr. Rozhodnutí srdcem bude to pravé."
  },
];

// Po 7 sekundách skryje intro a ukáže kartu
setTimeout(() => {
  introText.style.animation = 'fadeOut 2s ease forwards';
  setTimeout(() => {
    introText.style.display = 'none';
    cardContainer.style.display = 'block';
  }, 2000);
}, 7000);

// Kliknutí na kartu
tarotCard.addEventListener('click', () => {
  if (tarotCard.classList.contains('is-flipped')) return;

  tarotCard.classList.add('is-flipped');

  const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
  cardFront.style.backgroundImage = `url(${randomCard.image})`;

  setTimeout(() => {
    meaningText.innerHTML = randomCard.meaning;
    meaningText.style.display = 'block';

    // Ukáže tlačítko zpět
    const backBtn = document.getElementById('back-button');
    backBtn.classList.add('show');
  }, 1200);
});

// Zpět reload stránky
function goBack() {
  window.location.href = "tarot.html";
}
document.getElementById('back-button').addEventListener('click', goBack);