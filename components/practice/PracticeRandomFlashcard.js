import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

export class PracticeRandomFlashcard extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      flashcard: props.flashcard,
      isFlashcardChecked: false,
      flashcardText: props.flashcard.front,
      nextFlashcard: props.nextFlashcard
    }
  }

  onPressFlashcard = () => {
    if (! this.state.isFlashcardChecked){
      this.setState({
        isFlashcardChecked: true,
        flashcardText: this.state.flashcard.back
      })
    }
    else{
      this.state.nextFlashcard()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.falshcard} onPress={this.onPressFlashcard}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.falshcardText}>{this.state.flashcardText}</Text>
          </View>
          <Text style={[styles.falshcardInfo, {color: '#1e1e1e'}]}>{this.state.isFlashcardChecked ? 'back' : 'front'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default PracticeRandomFlashcard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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

  falshcardText: {
    fontSize: 25,
    textAlign: 'center'
  },

  falshcardInfo: {
    textAlign: 'right'
  }
})