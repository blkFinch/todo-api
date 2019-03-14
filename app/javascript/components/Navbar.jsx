import React from 'react';

export default class Main extends React.Component{


  logoutBtn(){
    if(this.props.loggedInStatus == false){
      return(
        <a class="button is-light">
          Log in
        </a>
      );
    }else{
      return(
        <a class="button is-danger" onClick = { this.props.logout }>
          Log Out
        </a>
      )
    }
  }

  render(){
    return(
      <nav className="navbar">
        <div className="navbar-brand">
          <b>TODO APP</b>
        </div>
        <div className="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
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