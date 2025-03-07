import React from 'react';

interface NavBarItemProps {
  onHover: (id: number) => void,
  IconFill: any,
  IconOutline: any,
  title: string,
  id: number,
}

class NavBarItem extends React.Component<NavBarItemProps> {
  IconFill: any;
  IconOutline: any;
  Icon: any;
  proximity: boolean;
  title: string;
  id: number;
  onHover: (id: number) => void;
  constructor(props: NavBarItemProps) {
    super(props);
    this.IconFill = props.IconFill;
    this.IconOutline = props.IconOutline;
    this.Icon = this.IconOutline;
    this.proximity = false;
    this.title = props.title;
    this.id = props.id;
    this.onHover = props.onHover;
  }

  switchState() {
    console.log('Switching state');
    this.Icon = this.Icon === this.IconOutline ? this.IconFill : this.IconOutline;
  }

  setProximity(state: boolean) { this.proximity = state; }

  render() {
    return (
      <button className={`navbar-item ${this.proximity ? 'proximity' : ''}`} onClick={() => this.switchState()} onMouseEnter={() => this.onHover(this.id)}>
        <this.Icon className="icon" />
        <span>{this.title}</span>
      </button>
    );
  }
}

export default NavBarItem