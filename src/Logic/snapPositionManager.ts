class SnapPositionManager {
  private verticalPositions: { x: number, y: number }[] = [];
  private horizontalPositions: { x: number, y: number }[] = [];

  private isPhone: boolean = window.innerWidth < 768;
  
  constructor() {
    this.verticalPositions = this.getVerticalSnapLocations();
    this.horizontalPositions = this.getHorizontalSnapLocations();
  }

  private getVerticalSnapLocations() {
    // const navbar = document.getElementsByClassName("navbar-container")[0];
    // const navbarStyle = window.getComputedStyle(navbar);

    const snapLocations: { x: number, y: number }[] = [];
    snapLocations.push({ x: window.innerWidth * 1/50, y: window.innerHeight * 1/30 });
    // snapLocations.push({ x: window.innerWidth * 49/50 - parseFloat(navbarStyle.width), y: window.innerHeight * 1/30 });
    return snapLocations;
  }

  private getHorizontalSnapLocations() {
    const snapLocations: { x: number, y: number }[] = [];
    for (let i = 0; i < window.innerWidth; i += 2000) {
      snapLocations.push({ x: 500, y: 500 });
    }
    return snapLocations;
  }

  public refresh() {
    this.verticalPositions = this.getVerticalSnapLocations();
    this.horizontalPositions = this.getHorizontalSnapLocations();
  }

  public getVertical() { return this.verticalPositions; }
  public getHorizontal() { return this.horizontalPositions; }
}

export default SnapPositionManager;