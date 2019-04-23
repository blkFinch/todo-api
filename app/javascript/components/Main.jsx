import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

import Navbar from './Navbar';
import LoginForm from './Login/LoginForm';
import NewProjectForm from './Projects/NewProjectForm';
import ProjectsList from './Projects/ProjectsList';
import ListsContainer from './Lists/ListsContainer';

export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      greeting: "Please Log In!",
      view: "login",
      user:{}, //TODO: move all user info in api

      activeProject:{},
      projects: [],
      lists: []
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.clearNotification = this.clearNotification.bind(this);

    this.handleSelectProject = this.handleSelectProject.bind(this);
    this.handleShowNewProject = this.handleShowNewProject.bind(this);
    this.handleRefreshProjects = this.handleRefreshProjects.bind(this);
    this.deleteActiveProject = this.deleteActiveProject.bind(this);
  }

  //TODO: set user to local storage to save in case of refresh (Maybe case for Redux???)
  componentDidMount(){
    var token = document.querySelector('meta[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-Token'] = token
    this.checkForActiveUser();
  }

  checkForActiveUser(){
    axios.get('/api/v1/return_active_user', {withCredentials: true})
    .then(response => {
      console.log(response);
      this.handleLogin(response.data.user);
    })
    .catch(error =>{
      console.log('Error', error.message);
    })
  }

  handleLogin(user){
    this.setState({
      view: "projects",
      greeting: "Welcome!",
      user: user
    });

    this.getProjects();
  }

  getProjects(){
    axios.get(`/api/v1/projects.json`, {withCredentials: true})
    .then(response => {
      console.log(response);
      this.setState({projects: response.data})
    })
    .catch(error =>{
      console.log(error);
    })
  }

  logout = () =>{
    axios.delete('api/v1/logout', {withCredentials: true})
    .then(response => {
      console.log(response);
      this.setState({
        greeting: response.data.message,
        view: "login",
        activeProject:{},
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
        <div className='tile notification is-info is-vertical'>
          <div className="tile">
            <a className="has-text-light" onClick={this.clearNotification}>close</a>
          </div>
          <div className="tile">{this.state.greeting }</div>
        </div>
      )
    }
  }

  setNotification(notification){
    this.setState({
      greeting: notification
    })
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

  handleShowNewProject(){
    this.setState({
      activeProject:{}
    })
  }

  handleRefreshProjects(response){
    console.log(response)
      const projects = update(this.state.projects, {
        $splice: [[0,0, response.data]] //adds data to index[0]
      })
      this.setState({
        projects: projects,
        showNewProjectForm: false
      })
  }

  deleteActiveProject(){
    let id = this.state.activeProject.id
    axios.delete(`/api/v1/projects/${id}`)
    .then(response =>{
      console.log("project deleted");
      const projIndex = this.state.projects.findIndex(x => x.id === id) //finds the index of the active project
      const projects = update(this.state.projects,{ $splice: [[projIndex, 1]]})
      this.setState({
        activeProject: {},
        projects: projects,
        greeting: 'Project Deleted!',
      })
    })
    .catch(error => {
      console.log(error)
    })
  }


  // MAIN VIEW
  //
  // this is where the main logic for conditional rendering should live
  mainView(){
    if(this.state.view == "login"){
      //shows login and sign up
      return( <LoginForm handleLogin={this.handleLogin} onChangeUser={this.handleChangeUser} /> )
    }else if(this.state.view=="projects"){
      //main view of projects
      return(
        <div className="tile is-ancestor">
          <div className="tile is-parent">

            <div className="tile is-2">
              <ProjectsList
                    activeProject={this.state.activeProject}
                    projects={this.state.projects}
                    user={this.state.user}
                    handleSelectProject={this.handleSelectProject}
                    handleShowNewProject={this.handleShowNewProject}
                    deleteActiveProject ={this.deleteActiveProject}
              />
            </div>

            <div className="tile">
              {this.activeProjectView()}
            </div>

          </div>
        </div>
      )
    }
  }

  activeProjectView(){
    if(!this.isEmpty(this.state.activeProject)){
      return(
        <div className="container">
          <ListsContainer activeProject={this.state.activeProject} lists={this.state.lists} />
        </div>
      )
    }else{
      return(
        <NewProjectForm refreshProjects={this.handleRefreshProjects} />
      )
    }
  }

  //UTILITY
  //
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        < Navbar view={this.state.view} logout={this.logout} activeProject={this.state.activeProject} />

        <div className="section">

          <div className="level">
            {this.notificationBox()}
          </div>

          <div className="level">
            {this.mainView()}
          </div>

        </div>
      </div>
    );
  }
}