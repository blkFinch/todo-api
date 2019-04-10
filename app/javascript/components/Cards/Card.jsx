import React from 'react';
import ReactMarkdown from 'react-markdown';

class Card extends React.Component{

  handleEdit = () => {
    this.props.editCard(this.props.card.id)
  }

  handleDelete = () =>{
    this.props.deleteCard(this.props.card.id)
  }

  cardBody(){
    return(
      <ReactMarkdown source={this.props.card.body} className="content" />
    )
  }

  render(){
    return(
      <div className="todo-card card list-card" key={this.props.card.id}>
        <div className="card-header has-background-light">
          <p className="card-header-title">{this.props.card.title}</p>
          <a className="button is-small is-light"
            onClick={this.handleEdit}>...</a>
          <a className="button is-small is-light" onClick={this.handleDelete}>x</a>
        </div>
        <div className="card-content">
          {this.cardBody()}
        </div>
      </div>
    )
  }//end of render
}//end of class


export default Card