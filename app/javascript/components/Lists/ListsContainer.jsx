import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import List from './List';
import ListForm from './ListForm';

export default class ListsContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lists: [],
      editingListId: null,
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

  updateLists = (e) =>{
    const lists = update(this.state.lists, {
      $splice: [[0,0, e.data]] //adds data to index[0]
    })
    this.setState({
      lists: lists
    })
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

        <div className="columns">

          {this.state.lists.map((list) =>{
            return( <List list={list} key={list.id} /> )
          })}

          <div className="column is-full">
            <ListForm updateLists={this.updateLists} project={this.state.project} />
          </div>

        </div>

      </div>
    );
  }

}