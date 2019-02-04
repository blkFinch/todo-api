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
    var token = document.querySelector('meta[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-Token'] = token

    axios.get('/api/v1/cards.json')
    .then(response =>{
      console.log(response)
      this.setState({cards: response.data})
    })
    .catch(error => console.log(error))
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
      notification: 'Card Saved!'
    })
  }

  render() {
    return (
        <div className="container">

          <section className="hero is-primary is-bold">
            <div className='hero-body'>
              <h2 className="title">
                Sample List
              </h2>
            </div>
          </section>

          <div className="tile is-parent is-vertical">
            <span className="notification">{this.state.notification}</span>
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
                  <Card card={card} key={card.id} />
                )
              }
            })}
          </div>
        </div>
    );
  }
}