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

    this.deleteList = this.deleteList.bind(this)
  }

  componentDidMount(){
    this.getLists();
  }

  componentDidUpdate(prevProps){
    if(this.props.activeProject.id !== prevProps.activeProject.id){
      this.getLists();
    }
  }

  deleteList(id){
    axios.delete(`/api/v1/projects/${this.state.project.id}/lists/${id}`)
      .then(response => {
        console.log(response);
        const listIndex = this.state.lists.findIndex(x => x.id === id);
        const lists = update(this.state.lists,{ $splice: [[listIndex, 1]]});
        this.setState({
          lists: lists
        });
      })
      .catch(error =>{
        console.log(error);
      });
  }

  updateLists = (e) =>{
    const lists = update(this.state.lists, {
      $splice: [[0,0, e.data]] //adds data to index[0]
    })
    this.setState({
      lists: lists
    })
  }

  getLists() {
    var url = `/api/v1/projects/${this.props.activeProject.id}/lists`;
    //call user lists
    axios.get(url)
      .then(response => {
        console.log(response);
        this.setState({ lists: response.data });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status >= 500) {
          this.setState({ notification: "You must be logged in!" });
        }
      });
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
            return( <List list={list} key={list.id} deleteList={this.deleteList} /> )
          })}

          <div className="column is-3">
            <ListForm updateLists={this.updateLists} project={this.state.project} />
          </div>

        </div>

      </div>
    );
  }

}