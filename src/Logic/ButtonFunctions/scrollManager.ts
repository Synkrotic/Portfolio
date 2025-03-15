class ScrollManager {
  static scrollProjects() {
    document.getElementById('projects-header')?.scrollIntoView({behavior: 'smooth'});
  }

  static scrollHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  static scrollAbout() {
    document.getElementById('about-me-header')?.scrollIntoView({ behavior: 'smooth' });
  }
}

export default ScrollManager;