import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import List from './List';

export default class ListsContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lists: [],
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
        <b>
          User Lists here
        </b>

        <div>
          {this.state.lists.map((list) =>{
            return( <List list={list} key={list.id} /> )
          })}
        </div>

      </div>
    );
  }

}