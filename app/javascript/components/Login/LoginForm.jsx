import React from 'react';
import axios from 'axios';

export default class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      notification: '',
    }
  }

  handleInput = (e) => {
    console.log("handling input");
    this.setState({[e.target.name]: e.target.value})
  }

  login = () => {

    const request = {
      "username": this.state.username,
      "password": this.state.password
    }

    axios.post('api/v1/login', request, {withCredentials: true})
    .then(response => {
      console.log(response);
      this.props.handleLogin();
      this.setState({
        notification: response.data.message,
      });
      axios.defaults.headers.common['Authorization'] =
                                'Bearer ' + response.data.access_token;
    })
  }

  // TODO: refactor this to be callec on DIDmount to test if logged in
  test = () =>{

    axios.get('api/v1/test', {withCredentials: true})
    .then(response => {
      console.log(response);
      this.setState({notification: response.data.message});
    }).catch((error) =>{
      console.log('Error', error.message);
      if(error.response.status == 500 ){
        this.setState({notification: "Try logging in first"});
      }
    })
  }

  notificationBox(){
    if(this.state.notification != ''){
      return(<div className="notification">{this.state.notification}</div> )
    }else{
      return(null);
    }
  }

  render(){
    return(
      <div>
        {this.notificationBox()}
        <form>
          <div className="field">
            <label className="label">
              Username
            </label>
            <div className="control">
              <input className="input" type='text' name="username"
                value={this.state.username} onChange={this.handleInput} />
            </div>
          </div>

          <div className="field">
            <label className="label">
              Password
            </label>
            <div className="control">
              <input className="input" type='password' name="password"
                value={this.state.password} onChange={this.handleInput} />
            </div>
          </div>

          <a onClick={this.login} className='button is-primary'>
            Login!
          </a>
          <a onClick={this.test} className='button is-secondary'>
            Test!
          </a>
        </form>
      </div>
    )
  }
}