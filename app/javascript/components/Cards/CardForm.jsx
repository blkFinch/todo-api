import React from 'react';
import axios from 'axios';

export default class CardForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title: this.props.card.title,
      body: this.props.card.body
    }

    this.updateCard = this.updateCard.bind(this)
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }


  updateCard(){
    const card ={
      title: this.state.title,
      body: this.state.body
    }

    axios.put(`/api/v1/cards/${this.props.card.id}`,
      {
        card: card
    })
    .then(response => {
      this.props.updateCard(response.data)
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div className="box">
        <div className="field">
          <input className="input" type='text' name="title"
              value={this.state.title} onChange={this.handleInput} />
        </div>
        <div className="field">
          <textarea className="textarea" type='text-area' name="body"
              value={this.state.body} onChange={this.handleInput} />
        </div>
        <div>
          <a className="button is-small is-success" onClick={this.updateCard}>Submit!</a>
        </div>
      </div>
    )
  }

}