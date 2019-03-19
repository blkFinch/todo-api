import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import ProjectsList from './ProjectsList';

export default class ProjectView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      projects: [],
      activeProject: {},
      user: this.props.user
    }

    this.handleProjectSelect = this.handleProjectSelect.bind(this);
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

  handleProjectSelect(project){
    this.setState({
      activeProject: project
    });
  }

  render(){
    return(
      <div>
        <ProjectsList
          projects={this.state.projects}
          user={this.state.user}
          handleProjectSelect={this.handleProjectSelect}
          />
          <div>
            {this.state.activeProject.title}
          </div>
      </div>
    )
  }

}