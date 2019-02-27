import React from 'react';
import axios from 'axios';

export default class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
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

    axios.post('api/v1/login', request)
    .then(response => {
      console.log(response)
    })
  }

  render(){
    return(
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
      </form>
    )
  }
}