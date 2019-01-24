import React from 'react';
import axios from 'axios';

export default class CardForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      title: this.props.card.title,
      body: this.props.card.body
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  //onBlur event occurs after input field leaves focus
  handleBlur = () => {
    const card ={
      title: this.state.title,
      body: this.state.body
    }

    axios.patch(`/api/v1/cards/${this.props.card.id}`,
      {
        card: card
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div className="tile is-vertical is-5 is-child" key={this.props.card.id}>

        <form onBlur={this.handleBlur}>
          <div className="field">
            <label className="label">
              Card Title
            </label>
            <div className="control">
              <input className="input" type='text' name="title"
                value={this.state.title} onChange={this.handleInput} />
            </div>
          </div>

          <div className="field">
            <label className="label">
              Card Details
            </label>
            <div className="control">
              <input className="input" type='text' name="body"
                value={this.state.body} onChange={this.handleInput} />
            </div>
          </div>
        </form>

      </div>
    )
  }
}