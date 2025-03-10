async function scrollAbout() {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  await new Promise(resolve => setTimeout(resolve, 1000));
}

export default scrollAbout;