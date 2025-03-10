async function scrollHome() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await new Promise(resolve => setTimeout(resolve, 1000));
}

export default scrollHome;