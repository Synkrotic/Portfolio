async function scrollHome() {
  const app = document.getElementsByClassName('App')[0];
  app.classList.add('Scrolling');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await new Promise(resolve => setTimeout(resolve, 1000));
  app.classList.remove('Scrolling');
}

export default scrollHome;