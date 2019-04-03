import React from 'react';
import axios from 'axios';
import ProjectListItem from './ProjectListItem';

export default class ProjectsList extends React.Component{

  activeProjectOptions(){
    if(this.props.activeProject.title != null){
      return(
        <div>
          <p className="menu-label">
              {this.props.activeProject.title}
          </p>
          <ul className="menu-list">
            <li>Edit</li>
            <li>
              <a onClick={this.props.deleteActiveProject}>Delete</a>
            </li>
          </ul>
        </div>
      )
    }
  }

  render(){
    return(
      <aside className="menu">
      {this.activeProjectOptions()}
        <p className="menu-label">
          {this.props.user.username}'s Projects
        </p>

        <ul className="menu-list">
          {this.props.projects.map((project) =>{
              return(
                <li key={project.id}>
                  <ProjectListItem project={project} onProjectClick={this.props.handleSelectProject} />
                </li>
              );
            }
          )}
        <li>
            <button className="button is-link is-outlined is-fullwidth" onClick={this.props.handleShowNewProject}>New Project?</button>
        </li>
        </ul>
      </aside>
    )
  }
}