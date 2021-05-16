import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { insertFlashcard, updateFlashcard } from '../api/flashcard'

export class ManageFlashcardComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      flashcard: props.flashcard,
      hideModal: props.hideModal,
      forceRender: props.forceRender,
      warningMessage: ''
    }
  }

  saveFlashcard = async () => {
    var response = null
    if (this.state.flashcard.id === '00000000-0000-0000-0000-000000000000'){
      response = await insertFlashcard(this.state.flashcard)
    }
    else{
      response = await updateFlashcard(this.state.flashcard)
    }
    console.log(response)
    if (response.statusCode === 200){
      this.hideModal()
    }
    else{
      Alert.alert(
        'WARNING',
        response.content,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
            style: 'cancel'
          }
        ]
      )
    }
  }

  onChangeTextNative = (text) => {
    var flashcard = this.state.flashcard
    flashcard.native = text
    this.setState({
      flashcard: flashcard
    })
  }

  onChangeTextForeign = (text) => {
    var flashcard = this.state.flashcard
    flashcard.foreign = text
    this.setState({
      flashcard: flashcard
    })
  }

  hideModal = () => {
    this.state.hideModal()
    this.state.forceRender()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.inputText}>
          <Text style={styles.inputTextLabel}>NATIVE</Text>
          <TextInput autoCapitalize={'none'} onFocus={this.onFocusTextInput} onChangeText={text => this.onChangeTextNative(text)} value={this.state.flashcard.native} style={styles.loginInput}/>
        </View>
        <View style={styles.inputText}>
          <Text style={styles.inputTextLabel}>FOREIGN</Text>
          <TextInput autoCapitalize={'none'} onFocus={this.onFocusTextInput} onChangeText={text => this.onChangeTextForeign(text)} value={this.state.flashcard.foreign} style={styles.loginInput}/>
        </View>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#609D37'}]} onPress={this.saveFlashcard}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#A63432'}]} onPress={this.hideModal}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>DISCARD</Text>
        </TouchableOpacity>
        { this.state.warningMessage === '' ? <></> :  <Text style={styles.warningMessage}>{this.state.warningMessage}</Text>}
      </View>
    )
  }
}

export default ManageFlashcardComp

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1e1e1e',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 50,
    paddingVertical: 20,
    borderRadius: 30
  },

  textInput: {
    backgroundColor: '#fff',
    padding: 3,
    margin: 10,
    fontSize: 20
  },

  button: {
    paddingVertical: 5,
    borderRadius: 50,
    marginHorizontal: 10,
    marginVertical: 5
  },

  inputText: {
    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,

    marginHorizontal: 10,
    marginVertical: 5
  },

  inputTextLabel: {
    backgroundColor: '#703965',
    color: '#E6CEE2',
    padding: 2,
  },

  loginInput: {
    padding: 3,
    fontSize: 20,
    textAlign: 'center'
  },

  warningMessage: {
    color: 'red',
    textAlign: 'center'
  }
})