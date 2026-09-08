const header = document.querySelector('.ka-home-site-header');
const toggle = document.querySelector('.ka-home-menu-toggle');
const navigation = document.querySelector('#ka-home-primary-navigation');

document.querySelector('#ka-home-year').textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  header.classList.toggle('ka-home-scrolled', window.scrollY > 40);
}, { passive: true });

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('ka-home-open', !open);
  document.body.classList.toggle('ka-home-menu-open', !open);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('ka-home-open');
    document.body.classList.remove('ka-home-menu-open');
  });
});
