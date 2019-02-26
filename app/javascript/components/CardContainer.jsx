import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Card from './Card';
import CardForm from './CardForm';

export default class CardContainer extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      cards: [],
      editingCardId: null,
      notification: ''
    }
  }

  componentDidMount(){


    axios.get('/api/v1/cards.json')
    .then(response =>{
      console.log(response)
      this.setState({cards: response.data})
    })
    .catch(error => {
      console.log(error);
      if(error.response.status >= 500){
        this.setState({notification: "You must be logged in!"})
      }
    })
  }

  addNewCard = () => {

    axios.post('/api/v1/cards.json',
      {
        card:
        {
          title: "card title",
          body: "card body"
        }
      }
    )
    .then(response =>{
      console.log(response)
      const cards = update(this.state.cards, {
        $splice: [[0,0, response.data]] //adds data to index[0]
      })
      this.setState({
        cards: cards,
        editingCardId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  updateCard = (card) => {
    const cardIndex = this.state.cards.findIndex( x => x.id === card.id)
    const cards = update(this.state.cards, {
      [cardIndex]: { $set: card }
    })
    this.setState({
      cards: cards,
      notification: 'Card Saved!',
      editingCardId: null
    })
  }

  notificationBox(){
    if(this.state.notification != ''){
      return(<span className="notification">{this.state.notification}</span> )
    }else{
      return(null);
    }
  }

  enableEditing = (id) =>{
    this.setState({ editingCardId: id })
  }

  deleteCard = (id) => {
    axios.delete(`/api/v1/cards/${id}`)
    .then(response => {
      const cardIndex = this.state.cards.findIndex(x => x.id === id)
      const cards = update(this.state.cards, { $splice: [[cardIndex, 1]]})
      this.setState({
        cards: cards,
        notification: 'Card Deleted!'
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
        <div className="container">

          <div className="tile is-parent is-vertical">
            { this.notificationBox() }

            <div className="tile is-child">
              <a className='button is-warning'
                onClick={this.addNewCard}>
                  New Card
              </a>
            </div>


            {this.state.cards.map((card) => {
              if(this.state.editingCardId == card.id){
                return(<CardForm card={card} key={card.id} updateCard={this.updateCard}/>)
              }else{
                return(
                  <Card card={card} key={card.id} onClick={this.enableEditing} onDelete={this.deleteCard} />
                )
              }
            })}
          </div>
        </div>
    );
  }
}