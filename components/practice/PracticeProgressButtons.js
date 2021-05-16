import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { updateFlashcardProgress } from '../../api/practice'

export class PracticeProgressButtons extends Component {
  constructor(props){
    super(props)

    this.state = {
      flashcardProgressId: props.flashcard.flashcardProgressId,
      nextFlashcard: props.nextFlashcard
    }
  }

  onPressKnow = async () => {
    await updateFlashcardProgress(this.state.flashcardProgressId, 1)
    await this.state.nextFlashcard()
  }

  onPressMedium = async () => {
    await updateFlashcardProgress(this.state.flashcardProgressId, 2)
    await this.state.nextFlashcard()
  }

  onPressDontKnow = async () => {
    await updateFlashcardProgress(this.state.flashcardProgressId, 3)
    await this.state.nextFlashcard()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPressKnow} style={[styles.buttons, {backgroundColor: '#54A337'}]}>
          <Text style={styles.buttonText}>Know</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressMedium} style={[styles.buttons, {backgroundColor: '#BCC53C'}]}>
          <Text style={styles.buttonText}>Wasn't sure</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressDontKnow} style={[styles.buttons, {backgroundColor: '#BC2E2E'}]}>
          <Text style={styles.buttonText}>Don't know</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default PracticeProgressButtons

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    height: 60,
    marginHorizontal: '5%',
    width: '90%',
    flexDirection: 'row',
  },

  buttons: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 5
  },

  buttonText: {
    textAlign: 'center',
    color: '#fff'
  }
})