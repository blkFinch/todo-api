import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import LoginForm from './Login/LoginForm';
import ProjectView from './Projects/ProjectView';

export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      greeting: "Please Log In!",
      view: "login",
      user:{},
      activeProject:{}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSelectProject = this.handleSelectProject.bind(this);
    this.clearNotification = this.clearNotification.bind(this)
  }

  //TODO: set user to local storage to save in case of refresh (Maybe case for Redux???)
  componentDidMount(){
    var token = document.querySelector('meta[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-Token'] = token
  }

  handleLogin(user){
    this.setState({
      view: "projects",
      greeting: "Welcome!",
      user: user
    });
  }

  logout = () =>{
    axios.delete('api/v1/logout', {withCredentials: true})
    .then(response => {
      console.log(response);
      this.setState({
        greeting: response.data.message,
        view: "login",
        user: {}
      });
    })
    .catch((error) =>{
      console.log('Error', error.message);
    })
  }

  notificationBox(){
    if(this.state.greeting){
      return(
        <div className='tile notification is-secondary is-vertical'>
          <div className="tile">
            <a className="has-text-grey" onClick={this.clearNotification}>close</a>
          </div>
          <div className="tile">{this.state.greeting }</div>
        </div>
      )
    }
  }

  //Deletes Flash Message Box
  clearNotification(){
    this.setState({greeting: ""})
  }

  //PROJECT HANDLERS
  //
  handleSelectProject(project){
    this.setState({activeProject: project});
  }

  // MAIN VIEW
  //
  // this is where the main logic for conditional rendering should live
  mainView(){
    if(this.state.view=="login"){
      return( <LoginForm handleLogin={this.handleLogin} onChangeUser={this.handleChangeUser} /> )
    }else if(this.state.view=="projects"){
      return(<ProjectView user={this.state.user} handleSelectProject={this.handleSelectProject}/>)
    }
  }

  render() {
    return (
      <div>
        < Navbar view={this.state.view} logout={this.logout} activeProject={this.state.activeProject} />

        <div className="section">
          <div className="container is-fluid">

            <div className="level">
              {this.notificationBox()}
            </div>

            <div className="level">
              {this.mainView()}
            </div>

          </div>
        </div>
      </div>
    );
  }
}