import React from 'react';

interface NavBarItemProps {
  buttonFunction: () => void,
  deactivateRange?: { top: number, bottom: number},
  extraClass: string,
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
  extraClass?: string;
  buttonFunction: () => void;
  deactivateRange?: { top: number, bottom: number }

  constructor(props: NavBarItemProps) {
    super(props);
    this.IconFill = props.IconFill;
    this.IconOutline = props.IconOutline;
    this.Icon = this.IconOutline;
    this.title = props.title;
    this.id = props.id;
    this.extraClass = props.extraClass;
    this.buttonFunction = props.buttonFunction;
    this.deactivateRange = props.deactivateRange;
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (this.deactivateRange) {
        if (window.scrollY >= this.deactivateRange.top && window.scrollY < this.deactivateRange.bottom) {
          this.Icon = this.IconFill;
          this.forceUpdate();
        } else {
          this.Icon = this.IconOutline;
          this.forceUpdate();
        }
      }
    });
  }

  handleClick() {
    this.buttonFunction();
    this.Icon = this.IconFill;
    this.forceUpdate();
  }

  render() {
    return (
      <button className={`navbar-item ${this.extraClass}`} onClick={() => this.handleClick()}>
        <this.Icon className="icon" />
        <span>{this.title}</span>
      </button>
    );
  }
}

export default NavBarItem