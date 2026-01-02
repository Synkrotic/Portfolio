class ScrollManager {
  private static scrolling = false;

  private static startScroll(action: () => void) {
    ScrollManager.scrolling = true;
    action();

    let timeout: number | undefined;

    const onScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        ScrollManager.scrolling = false;
        window.removeEventListener("scroll", onScroll);
      }, 150);
    };

    window.addEventListener("scroll", onScroll);
  }

  static scrollHome() {
    ScrollManager.startScroll(() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  static scrollAbout() {
    ScrollManager.startScroll(() =>
      document.getElementById("about-me-header")?.scrollIntoView({
        behavior: "smooth",
      })
    );
  }

  static scrollProjects() {
    ScrollManager.startScroll(() =>
      document.getElementById("projects-header")?.scrollIntoView({
        behavior: "smooth",
      })
    );
  }

  static scrollContact() {
    ScrollManager.startScroll(() =>
      document.getElementById("contact-header")?.scrollIntoView({
        behavior: "smooth",
      })
    );
  }

  static isScrolling(): boolean {
    return ScrollManager.scrolling;
  }
}

export default ScrollManager;
