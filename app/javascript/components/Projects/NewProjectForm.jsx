import React from 'react';
import axios from 'axios';

export default class NewProjectForm extends React.Component{

  constructor(props){
    super(props);
    this.state={
        title:"",
        description: ""
      }

      this.submitNewProject = this.submitNewProject.bind(this);
  }

  handleInput = (e) => {
    console.log("handling input");
    this.setState({[e.target.name]: e.target.value});
  }

  submitNewProject(){
    axios.post('/api/v1/projects', {
      project:{
        title: this.state.title,
        description: this.state.description
      }
    })
    .then(response =>{
      this.props.refreshProjects(response);
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
        <div>
          <form>
            <div className="field">
              <label className="label">Project Title</label>
              <div className="control">
                <input className="input" type="text" name="title" value={this.state.title} onChange={this.handleInput}></input>
              </div>
            </div>
            <div className="field">
              <label className="label">Project Description</label>
              <div className="control">
                <textarea className="textarea" type="textarea" name="description" value={this.state.description} onChange={this.handleInput}></textarea>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <a className="button is-info" onClick={this.submitNewProject}>Submit</a>
              </div>
            </div>
          </form>
        </div>
    );
  }
}