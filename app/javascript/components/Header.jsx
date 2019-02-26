import React from 'react';

const Header = props =>(
  <section className="hero is-primary is-bold">
    <div className='hero-body'>
      <h2 className="title">
        {props.title}
      </h2>
    </div>
  </section>
)

export default Header;