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

  render() {
    return (
      <section className="section">
        <div className="container">

          <section className="hero is-primary is-bold">
            <div className='hero-body'>
              <h2 className="title">
                Sample List
              </h2>
            </div>
          </section>

          <div className="tile is-parent is-vertical">

            <div className="tile is-child">
              <a className='button is-warning'
                onClick={this.addNewCard}>
                  New Card
              </a>
            </div>

            {this.state.cards.map((card) => {
              if(this.state.editingCardId == card.id){
                return(<CardForm card={card} key={card.id} />)
              }else{
                return(
                  <Card card={card} key={card.id} />
                )
              }
            })}
          </div>
        </div>
      </section>
    );
  }
}