import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import ProjectsList from './ProjectsList';
import NewProjectForm from './NewProjectForm';

export default class ProjectView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      projects: [],
      showNewProjectForm: false,
      newTitle:"",
      newDesc:"",
      user: this.props.user
    }

    this.handleShowNewProject = this.handleShowNewProject.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/v1/users/${this.props.user.id}/projects.json`, {withCredentials: true})
    .then(response => {
      console.log(response);
      this.setState({projects: response.data})
    })
    .catch(error =>{
      console.log(error);
    })
  }

  handleShowNewProject(){
    this.setState({
      showNewProjectForm: true,
      activeProject:""
    })
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  contentView(){
    if(this.state.showNewProjectForm){
      return(
        <NewProjectForm />
      )
    }
  }

  render(){
    return(
      <div>

        <div className="columns is-12">
          <div className="column">
            <ProjectsList
              projects={this.state.projects}
              user={this.state.user}
              handleSelectProject={this.props.handleSelectProject}
              handleShowNewProject={this.handleShowNewProject}
            />
          </div>
          <div className="column is-12">
            {this.contentView()}
          </div>
        </div>
      </div>
    )
  }

}