import React from 'react';
import axios from 'axios';

export default class ListForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      name: "",
    }

    this.submitNewList = this.submitNewList.bind(this);
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  //onBlur event occurs after input field leaves focus
  submitNewList(){
    const list ={
      name: this.state.name,
    }

    axios.post(`/api/v1/projects/${this.props.project.id}/lists`,
      {
        list: list
    })
    .then(response => {
      this.props.updateLists(response)
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div>

        <div className="form">
          <div className="field">
            <div className="control">
              <input className="input" type='text' name="name"
                  value={this.state.name} onChange={this.handleInput} placeholder="New List Title" />
              </div>
          </div>
          <div className="field">
            <a className='button is-success is-fullwidth' onClick={this.submitNewList}>New List</a>
          </div>
        </div>

      </div>
    )
  }
}