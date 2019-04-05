import React from 'react';

class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dropDownActive: false
    }

    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

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

  dropDown(){
    let dropdownClass = ["dropdown"];
    if(this.state.dropDownActive){
      dropdownClass.push('is-active');
    }

    return(
      <div className={dropdownClass.join(' ')} id="dd-list-menu" onBlur={this.toggleDropDown}>
        <div className="dropdown-trigger">
          <button className="is-primary button" onClick={this.toggleDropDown} >...</button>
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

  render(){
    return(
      <div className="column is-4" key={this.props.list.id}>
        <article className="message is-primary">

          <div className="message-header">
            <p>
              {this.props.list.name}
            </p>
            {this.dropDown()}
          </div>

        </article>
      </div>
    )
  }//end of render
}//end of class


export default List