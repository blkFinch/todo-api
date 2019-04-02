import React from 'react';

class List extends React.Component{

  render(){
    return(
      <div className="column is-full" key={this.props.list.id}>
        <p className="title">
          {this.props.list.name}
        </p>
      </div>
    )
  }//end of render
}//end of class


export default List