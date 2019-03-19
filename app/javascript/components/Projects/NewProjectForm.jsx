import React from 'react';
import axios from 'axios';

export default class NewProjectForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      title: this.props.project.title,
      description: this.props.project.description
    }
  }
}