import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Card from '../Cards/Card';
import CardForm from '../Cards/CardForm';

class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dropDownActive: false,
      cards: [],
      editingCardId: null
    }

    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  componentDidMount(){
    this.getCards();
  }

  //CARD HANDLERS
  //
  getCards() {
    var url = `/api/v1/lists/${this.props.list.id}/cards`;
    //call user lists
    axios.get(url)
      .then(response => {
        console.log(response);
        this.setState({ cards: response.data });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status >= 500) {
          this.setState({ notification: "You must be logged in!" });
        }
      });
  }

  addNewCard = () => {
    axios.post(`api/v1/lists/${this.props.list.id}/cards`,
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

  editCard = (id) => {
    this.setState({
      editingCardId: id
    })
  }

  deleteCard = (id) =>{
    axios.delete(`api/v1/lists/${this.props.list.id}/cards/${id}`)
      .then(response => {
        const cardIndex = this.state.cards.findIndex(x => x.id === id);
        const cards = update(this.state.cards,{ $splice: [[cardIndex, 1]]});
        this.setState({
          cards: cards
        });
      })
      .catch(error =>{
        console.log(error);
      });
  }

  updateCard = (card) => {
    const cardIndex = this.state.cards.findIndex( x => x.id === card.id)
    const cards = update(this.state.cards, {
      [cardIndex]: { $set: card }
    })
    this.setState({
      cards: cards,
      editingCardId: null
    })
  }

  //LIST HANDLERS
  //
  handleDeleteList = () => {
    this.props.deleteList(this.props.list.id);
  }

  toggleDropDown(){
    if(this.state.dropDownActive == false){
      this.setState({dropDownActive: true})
    }else{
      this.setState({dropDownActive: false})
    }
  }

  //RENDER FUNCTIONS
  //
  dropDown(){
    let dropdownClass = ["dropdown"];
    if(this.state.dropDownActive){
      dropdownClass.push('is-active');
    }

    return(
      <div className={dropdownClass.join(' ')} id="dd-list-menu" onBlur={this.toggleDropDown}>
        <div className="dropdown-trigger">
          <button className="is-primary button is-small" onClick={this.toggleDropDown} >...</button>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content has-text-grey">
            <a className="dropdown-item">Edit</a>
            <a className="dropdown-item" onMouseDown={this.handleDeleteList}>Delete</a>
          </div>
        </div>
      </div>
    )
  }

  cardList(){
    return(
      this.state.cards.map((card) => {
        if(this.state.editingCardId == card.id){
          return(<CardForm card={card} key={card.id} updateCard={this.updateCard}/>)
        }else{
          return(
            <Card card={card} key={card.id} editCard={this.editCard} deleteCard={this.deleteCard} />
          )
        }
      })
    );
  }

  render(){
    return(
      <div className="column is-4" key={this.props.list.id}>
        <article className="message is-primary is-small is-paddingless">

          <div className="message-header">
            <p>
              {this.props.list.name}
            </p>
            {this.dropDown()}
          </div>
          <div className="message-body">
            {this.cardList()}
          </div>
          <div>
            <a className="button is-primary is-inverted is-fullwidth"
              onClick={this.addNewCard}>New Card</a>
          </div>
        </article>
      </div>
    )
  }//end of render
}//end of class


export default List