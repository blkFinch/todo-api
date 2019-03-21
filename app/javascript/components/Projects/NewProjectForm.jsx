import React from 'react';
import axios from 'axios';

export default class NewProjectForm extends React.Component{

  render(){
    return(
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Project Title</label>
            <div className="control">
              <input className="input" type="text" name="newTitle" value={this.props.newTitle}></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Project Description</label>
            <div className="control">
              <textarea className="teaxtarea" type="textarea" name="newDesc" value={this.props.newDesc}></textarea>
            </div>
          </div>
          <div className="field">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}