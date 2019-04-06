import React from 'react';

class Card extends React.Component{

  handleEdit = () => {
    this.props.editCard(this.props.card.id)
  }

  handleDelete = () =>{
    this.props.onDelete(this.props.card.id)
  }

  render(){
    return(
      <div className="todo-card card list-card" key={this.props.card.id}>
        <div className="card-header has-background-light">
          <p className="card-header-title">{this.props.card.title}</p>
          <div className="card-header-icon is-button is-small"
            onClick={this.handleEdit}>...</div>
          <div className="card-header-icon" onClick={this.handleDelete}>x</div>
        </div>
        <div className="card-content">
          <p>{this.props.card.body}</p>
        </div>
      </div>
    )
  }//end of render
}//end of class


export default Card