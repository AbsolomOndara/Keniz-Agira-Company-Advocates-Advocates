const kaAboutHeader = document.querySelector('.ka-about-header');
const kaAboutMenuToggle = document.querySelector('.ka-about-menu-toggle');
const kaAboutNavigation = document.querySelector('#ka-about-navigation');
const kaAboutDropdownToggle = document.querySelector('.ka-about-dropdown-toggle');

document.querySelector('#ka-about-year').textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  kaAboutHeader.classList.toggle('ka-about-header-scrolled', window.scrollY > 40);
}, { passive: true });

kaAboutMenuToggle.addEventListener('click', () => {
  const isOpen = kaAboutMenuToggle.getAttribute('aria-expanded') === 'true';
  kaAboutMenuToggle.setAttribute('aria-expanded', String(!isOpen));
  kaAboutNavigation.classList.toggle('ka-about-navigation-open', !isOpen);
  document.body.classList.toggle('ka-about-menu-open', !isOpen);
});

kaAboutDropdownToggle.addEventListener('click', () => {
  const isOpen = kaAboutDropdownToggle.getAttribute('aria-expanded') === 'true';
  kaAboutDropdownToggle.setAttribute('aria-expanded', String(!isOpen));
  document.querySelector('#ka-about-dropdown').classList.toggle('ka-about-dropdown-open', !isOpen);
});

kaAboutNavigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    kaAboutMenuToggle.setAttribute('aria-expanded', 'false');
    kaAboutNavigation.classList.remove('ka-about-navigation-open');
    document.body.classList.remove('ka-about-menu-open');
  });
});

