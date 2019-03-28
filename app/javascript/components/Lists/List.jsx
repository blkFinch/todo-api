import React from 'react';

class List extends React.Component{

  render(){
    return(
      <div key={this.props.list.id}>
        {this.props.list.name}
      </div>
    )
  }//end of render
}//end of class


export default List