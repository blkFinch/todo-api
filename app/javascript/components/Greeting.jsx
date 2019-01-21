import React from 'react';
import CardContainer from './CardContainer';

export default class Greeting extends React.Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">
            Hello World from react
          </h1>
          <p className="subtitle">
            My first website with <strong>Bulma</strong>!
          </p>
        </div>
        <div className="container">
          <CardContainer />
        </div>
      </section>
    );
  }
}