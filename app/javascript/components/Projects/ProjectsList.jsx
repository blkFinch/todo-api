import React from 'react';
import { runInThisContext } from 'vm';

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
              <a className="panel-block" key={project.id}
                onClick={() => this.props.handleProjectSelect(project)}>
                {project.title}
              </a>
            );
          }
        )}
        <div className="panel-block">
            <button className="button is-link is-outlined is-fullwidth">New Project?</button>
        </div>
      </nav>
    )
  }
}