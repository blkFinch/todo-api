import React from 'react';

class Card extends React.Component{

  handleClick = () => {
    this.props.onClick(this.props.card.id)
  }

  handleDelete = () =>{
    this.props.onDelete(this.props.card.id)
  }

  render(){
    return(
      <div className="todo-card tile is-vertical is-5 is-child" key={this.props.card.id}>
        <div className=" delete-btn button is-danger is-small" onClick={this.handleDelete}>x</div>
        <article className="notification is-info" >
          <p className="title" onClick={this.handleClick}>{this.props.card.title}</p>
          <p className="subtitle" onClick={this.handleClick}>{this.props.card.body}</p>
        </article>
      </div>
    )
  }//end of render
}//end of class


export default Card