import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { updateFlashcardProgress } from '../../api/practice'

export class PracticeMultipleChoiceItem extends Component {
  constructor(props){
    super(props)

    this.state = {
      flashcard: props.flashcard,
      isFlashcardChecked: false,
      flashcardText: props.flashcard.front,
      nextFlashcard: props.nextFlashcard,
      userChoose: null
    }
  }

  userChooseA = ()  => {
    if (this.state.isFlashcardChecked){
      return
    }
    this.setState({
      isFlashcardChecked: true,
      userChoose: 1
    })
  }

  userChooseB = ()  => {
    if (this.state.isFlashcardChecked){
      return
    }
    this.setState({
      isFlashcardChecked: true,
      userChoose: 2
    })
  }

  userChooseC = ()  => {
    if (this.state.isFlashcardChecked){
      return
    }
    this.setState({
      isFlashcardChecked: true,
      userChoose: 3
    })
  }

  nextFlashcard = async () => {
    if (this.state.isFlashcardChecked === true){
      console.log(this.state.flashcard.flashcardProgressId)
      if (this.state.userChoose === this.state.flashcard.correctAns){
        console.log('Correct ans')
        await updateFlashcardProgress(this.state.flashcard.flashcardProgressId, 1)
      } else{
        console.log('Incorrect ans')
        await updateFlashcardProgress(this.state.flashcard.flashcardProgressId, 3)
      }
      
      this.state.nextFlashcard();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.falshcard}>
          <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={this.nextFlashcard}>
            <Text style={styles.falshcardText}>{this.state.flashcardText}</Text>
          </TouchableOpacity>
          <Text style={[styles.falshcardInfo, {color: '#1e1e1e'}]}>{this.state.isFlashcardChecked ? 'back' : 'front'}</Text>
        </View>

        <View style={{height: 10}}></View>

        <TouchableOpacity style={this.state.isFlashcardChecked === false ? styles.answer : this.state.flashcard.correctAns === 1 ? styles.answerCorrect : this.state.userChoose === 1 ? styles.answerIncorrect : styles.answer} onPress={this.userChooseA}>
          <Text style={styles.answerText}>{this.state.flashcard.ansA}</Text>
        </TouchableOpacity>

        <View style={{height: 5}}></View>

        <TouchableOpacity style={this.state.isFlashcardChecked === false ? styles.answer : this.state.flashcard.correctAns === 2 ? styles.answerCorrect : this.state.userChoose === 2 ? styles.answerIncorrect : styles.answer} onPress={this.userChooseB}>
          <Text style={styles.answerText}>{this.state.flashcard.ansB}</Text>
        </TouchableOpacity>

        <View style={{height: 5}}></View>
        <TouchableOpacity style={this.state.isFlashcardChecked === false ? styles.answer : this.state.flashcard.correctAns === 3 ? styles.answerCorrect : this.state.userChoose === 3 ? styles.answerIncorrect : styles.answer} onPress={this.userChooseC}>
          <Text style={styles.answerText}>{this.state.flashcard.ansC}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default PracticeMultipleChoiceItem

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

  falshcardText: {
    fontSize: 25,
    textAlign: 'center'
  },

  falshcardInfo: {
    textAlign: 'right'
  },

  answer: {
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

  answerCorrect: {
    maxHeight: 400,
    width: '90%',
    backgroundColor: '#80CA52',
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

  answerIncorrect: {
    maxHeight: 400,
    width: '90%',
    backgroundColor: '#A6403C',
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

  answerText: {
    fontSize: 17
  }
})