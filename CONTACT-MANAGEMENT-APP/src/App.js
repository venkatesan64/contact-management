// App.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

class App extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     
    this.state = {
      name: ''
    }
  }

  
  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      name: this.state.name
    }
    this.setState({
      name: ''
    });
    this.props.createContact(contact);
  }

  listView(data, index){
    return (
      <div>
        <div>
          <li key={index}>
            {data.name}
          </li>
        </div>
        <div>
          <button onClick={(e) => this.deleteContact(e, index)} >
            Remove row
          </button>
        </div>
    </div> 
    )
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
  }
  

  render() {

    return(
      <div>
        <div>App Contacts </div>
        <hr />
        <div>
          <div>Add Name </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange}  value={this.state.name}/><br />
            <input type="submit"  value="ADD++"/>
          </form>
          <hr />
        { <ul>
          {this.props.contacts.map((contact, i) => this.listView(contact, i))}
        </ul> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index =>dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);