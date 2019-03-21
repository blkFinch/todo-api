import React from 'react';

export default class ProjectNav extends React.Component{
  // constructor(){
  //   super(props);
  //   this.state = {
  //     title: this.props.activeProject.title
  //   }
  // }

  render(){
    return(
      <nav className="navbar is-info">
        <div className="navbar-brand">
          <div className="title is-2 has-text-light">
            {this.props.activeProject.title}
          </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
    </nav>
    )
  }
}