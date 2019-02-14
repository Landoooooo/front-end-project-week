import React from 'react';
import NoteContainer from './Containers/NoteContainer';
import CreateNew from './Views/CreateNew';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios'
import './App.css';
import styled from 'styled-components';

const AppContainer = styled.div`
  height:100vh;
`
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      notes: null,
      isLoaded: false
    }
  }

  componentDidMount(){
    console.log(this.state.notes)
    axios
    .get('https://fe-notes.herokuapp.com/note/get/all')
    .then(res => {
        this.setState({
          notes: res.data,
          isLoaded: true
        })
        console.log(res.data)
    })
    .catch(err => console.log(err))

  }

  addNewNoteToServer = note => {
    axios
    .post('https://fe-notes.herokuapp.com/note/create', note)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }

  addNewNote = note => {
    this.addNewNoteToServer(note)
  }
  render() {
    const { isLoaded, notes } = this.state;
    return (
      <AppContainer>
      { isLoaded ?
        <Route exact path="/"
        render={(props) => <NoteContainer {...props} notes={notes} />}
        /> :
        <div>Loading</div>
      }
        <Route path='/create-new'
        render={(props) => <CreateNew {...props} newNote={this.addNewNote}/>} />
      </AppContainer>
    );
  }
}

export default App;
