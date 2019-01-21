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
    axios.get('http://localhost:3000/api/v1/cards.json')
    .then(response =>{
      console.log(response)
      this.setState({cards: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <section className="section">
        <div className="container">

          <h2 className="title">
            Sample List
          </h2>

          <div className="tile is-parent is-vertical">
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