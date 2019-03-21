import React from "react";

export default class ProjectListItem extends React.Component{
  handleClick = () => {
    this.props.onProjectClick(this.props.project);
  }

  render() {
    return (
      <a onClick={this.handleClick}>
        {this.props.project.title}
      </a>
    );
  }
}