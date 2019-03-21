import React from 'react';
import ProjectListItem from './ProjectListItem';

export default class ProjectsList extends React.Component{

  render(){
    return(
      <nav className="panel">
        <p className="panel-heading">
          {this.props.user.username}'s Projects
        </p>

        {this.props.projects.map((project) =>{
            return(
              //TODO refactor this into a sub component
              <div className="panel-block" key={project.id}>
                <ProjectListItem project={project} onProjectClick={this.props.handleSelectProject} />
              </div>
            );
          }
        )}
        <div className="panel-block">
            <button className="button is-link is-outlined is-fullwidth" onClick={this.props.handleShowNewProject}>New Project?</button>
        </div>
      </nav>
    )
  }
}