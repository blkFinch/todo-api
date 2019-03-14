import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import LoginForm from './Login/LoginForm';

export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      greeting: "Please Log In!",
      logged_in: false
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount(){
    var token = document.querySelector('meta[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-Token'] = token

    this.checkLoggedIn();
  }

  checkLoggedIn(){

    axios.get('api/v1/test', {withCredentials: true})
    .then(response => {
      console.log(response);
      this.setState({greeting: response.data.message});
      return true;
    }).catch((error) =>{
      console.log('Error', error.message);
      if(error.response.status == 500 ){
        this.setState({greeting: "Try logging in first"});
      }
      return false;
    })
  }

  handleLogin(){
    this.setState({
      logged_in: true,
      greeting: "Welcome!"
    });
  }

  logout = () =>{
    axios.delete('api/v1/logout', {withCredentials: true})
    .then(response => {
      console.log(response);
      this.setState({
        greeting: response.data.message,
        logged_in: false
      });
    })
    .catch((error) =>{
      console.log('Error', error.message);
    })
  }

  loginForm(){
    if(this.state.logged_in == false){
      return( <LoginForm handleLogin={this.handleLogin}/>)
    }
  }

  render() {
    return (
      <div>
        < Navbar loggedInStatus= {this.state.logged_in} logout = {this.logout} />

        <div className="section">
          <div className="container is-fluid">
            <div className="tile is-ancestor">
              <div className='tile'>
              {this.loginForm()}
              </div>
              <div className='tile'>
                {this.state.greeting}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}