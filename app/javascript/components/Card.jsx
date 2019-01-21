import React from 'react';

const Card = ({card}) =>
  <div className="tile is-vertical is-5 is-child" key={card.id}>
  <article className="notification is-info">
    <p className="title">{card.title}</p>
    <p className="subtitle">{card.body}</p>
  </article>
  </div>

export default Card