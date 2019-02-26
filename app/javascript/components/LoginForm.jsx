import React from 'react';
import axios from 'axios';

export default class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleInput = (e) => {
    console.log("handling input");
    this.setState({[e.target.name]: e.target.value})
  }

  login = () => {

    const request = {
      "auth":{
          "email": this.state.email,
          "password": this.state.password
        }
    }

    axios.post('api/v1/user_token', request)
    .then(response => {
      console.log(response)
    })
  }

  render(){
    return(
      <form>
        <div className="field">
          <label className="label">
            Email
          </label>
          <div className="control">
            <input className="input" type='text' name="email"
              value={this.state.email} onChange={this.handleInput} />
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