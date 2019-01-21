import React from 'react';
import axios from 'axios';
import Card from './Card';

export default class CardContainer extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      cards: []
    }
  }

  componentDidMount(){
    // TODO: there may be shortcut to call rails service
    axios.get('/api/v1/cards.json')
    .then(response =>{
      console.log(response)
      this.setState({cards: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewCard = () => {
    axios.post(
      '/api/v1/cards',
      {
        card:
        {
          title: 'card title',
          body: 'card body'
        }
      }
    )
    .then(response =>{
      console.log(response)
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
              return(
                <Card card={card} key={card.id} />
              )
            })}
          </div>


        </div>
      </section>
    );
  }
}