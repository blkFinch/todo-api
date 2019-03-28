import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import List from './List';

export default class ListsContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lists: [],
      project: this.props.activeProject
    }
  }

  componentDidMount(){
    var url= `/api/v1/projects/${this.props.activeProject.id}/lists`;
    //call user lists
    axios.get(url)
    .then(response =>{
      console.log(response)
      this.setState({lists: response.data})
    })
    .catch(error => {
      console.log(error);
      if(error.response.status >= 500){
        this.setState({notification: "You must be logged in!"})
      }
    })
  }

  addNewList = () =>{
    axios.post(`/api/v1/projects/${this.state.project.id}/lists.json`,
    {
      list:
      {
        name: "New List"
      }
    }
  )
  .then(response =>{
    console.log(response)
    const lists = update(this.state.lists, {
      $splice: [[0,0, response.data]] //adds data to index[0]
    })
    this.setState({
      lists: lists
    })
  })
  .catch(error => console.log(error))
  }

  lists(){
    return(
      <div>
        {this.state.lists.map((list) =>{
          <List list={list} />
        })}
      </div>
    )
  }

  render(){
    return(
      <div>

        <div className="tile is-parent">
          
          {this.state.lists.map((list) =>{
            return( <List list={list} key={list.id} /> )
          })}

          <div className="card">
            <a className='button is-warning is-fullwidth' onClick={this.addNewList}>New List?</a>
          </div>

        </div>

      </div>
    );
  }

}