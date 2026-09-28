(() => {
  const button = document.querySelector('.ka-practice-detail-menu');
  const navigation = document.getElementById('ka-practice-detail-navigation');
  if (button && navigation) {
    const closeMenu = () => {
      button.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('ka-practice-detail-nav-open');
      document.body.classList.remove('ka-practice-detail-locked');
    };
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('ka-practice-detail-nav-open', open);
      document.body.classList.toggle('ka-practice-detail-locked', open);
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }
  const year = document.querySelector('[data-ka-practice-detail-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
