document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card-display');
  const revealBtn = document.querySelector('#reveal-btn');

  if (revealBtn && card) {
    revealBtn.addEventListener('click', () => {
      card.classList.toggle('revealed');
    });
  }
});