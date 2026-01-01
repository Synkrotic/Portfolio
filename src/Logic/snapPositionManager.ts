class SnapPositionManager {
  private verticalPositions: { x: number, y: number }[] = [];
  private horizontalPositions: { x: number, y: number }[] = [];

  private marginX: GLfloat = window.innerWidth * 1/50
  private marginY: GLfloat = window.innerHeight * 1/30
  
  constructor() {
    this.verticalPositions = this.getVerticalSnapLocations();
    this.horizontalPositions = this.getHorizontalSnapLocations();
  }

  private getVerticalSnapLocations() {
    const navbar = document.getElementsByClassName("navbar-container")[0];
    if (!navbar) return [];
    const style = window.getComputedStyle(navbar);

  const snapLocations: { x: number, y: number }[] = [];

    snapLocations.push({ x: this.marginX, y: this.marginY });
    snapLocations.push({ x: this.marginX, y: (window.innerHeight - parseFloat(style.height)) / 2 });
    snapLocations.push({ x: this.marginX, y: window.innerHeight - this.marginY - parseFloat(style.height) });
    
    const rightX = window.innerWidth - this.marginX - parseFloat(style.width)
    snapLocations.push({ x: rightX, y: this.marginY });
    snapLocations.push({ x: rightX, y: (window.innerHeight - parseFloat(style.height)) / 2 });
    snapLocations.push({ x: rightX, y: window.innerHeight - this.marginY - parseFloat(style.height) });  
    return snapLocations
  }

  private getHorizontalSnapLocations() {
    const navbar = document.getElementsByClassName("navbar-container")[0];
    if (!navbar) return [];
    const style = window.getComputedStyle(navbar);

    const snapLocations: { x: number, y: number }[] = [];
    
    snapLocations.push({ x: this.marginX, y: this.marginY })
    snapLocations.push({ x: (window.innerWidth - parseFloat(style.width)) / 2, y: this.marginY })
    snapLocations.push({ x: window.innerWidth - this.marginX - parseFloat(style.width), y: this.marginY })

    const bottomY = window.innerHeight - this.marginY - parseFloat(style.height)
    snapLocations.push({ x: this.marginX, y: bottomY })
    snapLocations.push({ x: (window.innerWidth - parseFloat(style.width)) / 2, y: bottomY })
    snapLocations.push({ x: window.innerWidth - this.marginX - parseFloat(style.width), y: bottomY })

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