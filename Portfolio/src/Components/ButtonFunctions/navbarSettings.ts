function switchOrientation() {
  const navbar = document.getElementsByClassName('navbar-container')[0] as HTMLElement;
  let verticalOrientation = navbar.classList.contains('vertical');
  if (verticalOrientation) {
    navbar.classList.remove('vertical');
  } else {
    navbar.classList.add('vertical');
  }

  const navbarX = parseInt(navbar.style.left.replace('px', ''));
  const navbarY = parseInt(navbar.style.top.replace('px', ''));

  if (navbarX > (window.innerWidth / 2) - (navbar.clientWidth / 2) && navbar.classList.contains('vertical')) navbar.classList.add('left')
  else navbar.classList.remove('left');

  if (navbarY > (window.innerHeight - navbar.clientHeight)) {
    navbar.style.top = `${window.innerHeight - navbar.clientHeight}px`;
  }
  if (navbarX > (window.innerWidth - navbar.clientWidth)) {
    navbar.style.left = `${window.innerWidth - navbar.clientWidth}px`;
  }
}

export default switchOrientation;