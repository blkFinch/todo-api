import React from 'react';
import axios from 'axios';
import CardContainer from './CardContainer';
import Header from './Header';
import LoginForm from './LoginForm';

export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      headerText:'TODO APP'
    }
  }

  componentDidMount(){
    var token = document.querySelector('meta[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-Token'] = token
  }

  render() {
    return (
      <div className="container">
        <Header title={this.state.headerText} />

        <section>
          <div className='column is-one-third'>
            <LoginForm />
          </div>
        </section>

        <CardContainer />
      </div>
    );
  }
}