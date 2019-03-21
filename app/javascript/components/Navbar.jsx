import React from 'react';

export default class Main extends React.Component{


  logoutBtn(){
    if(this.props.view != "login"){
      return(
        <a className="button is-warning" onClick = { this.props.logout }>
        Log Out
      </a>
      );
    }
  }

  title(){
    var _title = "TODO APP"
    if(this.props.activeProject.title != null){
      _title = this.props.activeProject.title
    }
    return(
      <h3>
        {_title}
      </h3>
    );
  }

  render(){
    return(
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <div className="title is-2 has-text-light">
            {this.title()}
          </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                {this.logoutBtn()}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}