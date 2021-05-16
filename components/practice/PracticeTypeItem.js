import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { PracticeProgressButtons } from './PracticeProgressButtons'

export class PracticeTypeItem extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      flashcard: props.flashcard,
      isFlashcardChecked: false,
      flashcardText: props.flashcard.front,
      nextFlashcard: props.nextFlashcard,
      userInput: '',
      isAnswerCorrect: false
    }

    console.log(this.state.flashcard)
  }

  onChangeUserInput = (text) => {
    this.setState({
      userInput: text
    })
  }

  onPressFlashcard = () => {
    if (! this.state.isFlashcardChecked){
      console.log('BACK')
      console.log(this.state.flashcard.back)
      console.log('USER')
      console.log(this.state.userInput)
      if (this.state.flashcard.back === this.state.userInput){
        console.log('OK')
        this.setState({
          isFlashcardChecked: true,
          flashcardText: this.state.flashcard.back,
          isAnswerCorrect: true,
        })
      }
      else{
        this.setState({
          isFlashcardChecked: true,
          flashcardText: this.state.flashcard.back,
          isAnswerCorrect: false,
        })
      }
      
    }
  }

  render() {
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <KeyboardAvoidingView>
              <View style={this.state.isFlashcardChecked === false ? styles.falshcard : this.state.isAnswerCorrect ? styles.falshcardCorrectAns : styles.falshcardIncorrectAns}>
                {this.state.isFlashcardChecked ? <View style={{flex: 1, justifyContent: 'center'}}><Text style={ this.state.isFlashcardChecked === false ? styles.falshcardText : [styles.falshcardText, {color: '#fff'}]}>{this.state.userInput}</Text></View> : <TextInput autoCapitalize='none' autoCorrect={false} placeholder={'Type answer here'} value={this.state.userInput} multiline={true} style={styles.textInput} onChangeText={text => this.onChangeUserInput(text)}/>}
                <Text style={[styles.falshcardInfo, {color: '#1e1e1e'}]}>back</Text>
              </View> 
            </KeyboardAvoidingView>
            <View style={{height: 10}}></View>
            {this.state.isFlashcardChecked ? <PracticeProgressButtons nextFlashcard={this.state.nextFlashcard} flashcard={this.state.flashcard}/> : <></>}
            <View style={{height: 10}}></View>
            <TouchableOpacity style={styles.falshcard} onPress={this.onPressFlashcard}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styles.falshcardText}>{this.state.flashcardText}</Text>
              </View>
              <Text style={[styles.falshcardInfo, {color: '#1e1e1e'}]}>{this.state.isFlashcardChecked ? 'back' : 'front'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
    )
  }
}

export default PracticeTypeItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  falshcard: {
    minHeight: 200,
    maxHeight: 400,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    padding: 20,

    marginHorizontal: '5%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },

  falshcardIncorrectAns: {
    minHeight: 200,
    maxHeight: 400,
    width: '90%',
    backgroundColor: '#A6403C',
    borderRadius: 25,
    justifyContent: 'center',
    padding: 20,

    marginHorizontal: '5%',
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },

  falshcardCorrectAns: {
    minHeight: 200,
    maxHeight: 400,
    width: '90%',
    backgroundColor: '#80CA52',
    borderRadius: 25,
    justifyContent: 'center',
    padding: 20,

    marginHorizontal: '5%',
    shadowColor: "#95E563",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },

  falshcardText: {
    fontSize: 25,
    textAlign: 'center'
  },

  falshcardInfo: {
    textAlign: 'right'
  },

  textInput: {
    fontSize: 25,
    textAlign: 'center',
    flex: 1
  }
})