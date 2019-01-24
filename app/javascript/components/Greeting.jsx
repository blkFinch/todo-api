import React from 'react';
import CardContainer from './CardContainer';

export default class Greeting extends React.Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <CardContainer />
        </div>
      </section>
    );
  }
}