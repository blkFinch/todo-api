import React from "react";
import ReactMarkdown from "react-markdown";

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      isHidden: true
    };
    this.toggleBody = this.toggleBody.bind(this);
  }

  toggleBody() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  handleEdit = () => {
    this.props.editCard(this.props.card.id);
  };

  handleDelete = () => {
    this.props.deleteCard(this.props.card.id);
  };

  handleMoveUp = () => {
    console.log("moving up");
    this.props.moveCardUp(this.props.card);
  };

  toggleBodyButton = () => {
    if (this.state.isHidden) {
      return(
        <a
          className="button is-small is-light fas fa-chevron-circle-down"
          onClick={this.toggleBody}
        />
      )
    } else {
      return(
        <a
          className="button is-small is-light fas fa-chevron-circle-up"
          onClick={this.toggleBody}
        />
      )
    }
  };

  cardBody() {
    if (!this.state.isHidden) {
      return (
        <div className="card-content">
          <ReactMarkdown source={this.props.card.body} className="content" />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="todo-card card list-card" key={this.props.card.id}>
        <div className="card-header has-background-light">
          <p className="card-header-title"> {this.props.card.title} </p>{" "}
          <a className="button is-small is-light" onClick={this.handleEdit}>
            {" "}
            ...{" "}
          </a>{" "}
          {this.toggleBodyButton()}
          <a className="button is-small is-light" onClick={this.handleDelete}>
            {" "}
            x{" "}
          </a>{" "}
        </div>{" "}
        {this.cardBody()}{" "}
        <div className="card-footer">
          <div className="card-footer-item" onClick={this.handleMoveUp}>
            {" "}
            <i className="fas fa-arrow-up" />{" "}
          </div>{" "}
          <div className="card-footer-item">
            {" "}
            <i className="fas fa-arrow-down" />{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  } //end of render
} //end of class

export default Card;
