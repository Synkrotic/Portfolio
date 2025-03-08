import React from 'react';

interface NavBarItemProps {
  buttonFunction: () => void,
  direction: string,
  IconFill: any,
  IconOutline: any,
  title: string,
  id: number,
}

class NavBarItem extends React.Component<NavBarItemProps> {
  IconFill: any;
  IconOutline: any;
  Icon: any;
  title: string;
  id: number;
  direction?: string;
  buttonFunction: () => void;
  constructor(props: NavBarItemProps) {
    super(props);
    this.IconFill = props.IconFill;
    this.IconOutline = props.IconOutline;
    this.Icon = this.IconOutline;
    this.title = props.title;
    this.id = props.id;
    this.direction = props.direction;
    this.buttonFunction = props.buttonFunction;
  }

  handleClick() {
    this.buttonFunction();
    this.Icon = this.Icon === this.IconOutline ? this.IconFill : this.IconOutline;
    this.forceUpdate();
  }

  render() {
    return (
      <button className={`navbar-item ${this.direction}`} onClick={() => this.handleClick()}>
        <this.Icon className="icon" />
        <span>{this.title}</span>
      </button>
    );
  }
}

export default NavBarItem