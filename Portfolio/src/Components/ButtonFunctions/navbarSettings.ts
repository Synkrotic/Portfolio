function switchOrientation() {
  const navbar = document.getElementsByClassName('navbar-container')[0] as HTMLElement;
  let verticalOrientation = navbar.classList.contains('vertical');
  if (verticalOrientation) {
    navbar.classList.remove('vertical');
  } else {
    navbar.classList.add('vertical');
  }
}

export default switchOrientation;