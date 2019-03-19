import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

export default class ListsContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lists: []
    }
  }

  componentDidMount(){
    var url= `/api/v1/users/${this.props.user_id}/lists`;
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

  render(){
    return(
      <div>
        <b>
          User Lists here
        </b>
      </div>
    );
  }

}