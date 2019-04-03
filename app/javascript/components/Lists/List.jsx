import React from 'react';

class List extends React.Component{

  render(){
    return(
      <div className="column is-4" key={this.props.list.id}>
        <article className="message is-primary">

          <div className="message-header">
            <p>
              {this.props.list.name}
            </p>
            <button className="is-primary button">...</button>
          </div>

        </article>
      </div>
    )
  }//end of render
}//end of class


export default List