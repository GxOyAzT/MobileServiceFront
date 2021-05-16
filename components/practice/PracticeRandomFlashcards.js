import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import PracticeRandomFlashcard from './PracticeRandomFlashcard'
import { getRandomFlashcard } from '../../api/practice'
import YouHaveNoFlashcard from './YouHaveNoFlashcard'

export class PracticeRandomFlashcards extends Component {
  constructor(props){
    super(props)

    this.state = {
      flashcard: null,
      hasUserOwnFlashcard: true,
      fetchProblemOccured: false
    }
  }

  getFlashcard = async () => {
    this.setState({
      flashcard: null
    })

    var response = await getRandomFlashcard()
    console.log(response)
    if (response.statusCode === 200){
      this.setState({
        flashcard: response.content,
        hasUserOwnFlashcard: response.statusCode === 404 ? false : true
      })
      return
    }

    this.setState({
      fetchProblemOccured: true
    })

    Alert.alert(
      'Error',
      response.content,
      [
        {
          text: "OK",
          onPress: () => {},
          style: 'default'
        }
      ]
    )
  }

  componentDidMount(){
    this.getFlashcard()
    console.log(this.state.flashcard)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.fetchProblemOccured ? <></> : this.state.hasUserOwnFlashcard === false ? <YouHaveNoFlashcard/> : this.state.flashcard === null ? <ActivityIndicator/> : <PracticeRandomFlashcard nextFlashcard={this.getFlashcard} flashcard={this.state.flashcard}/>}
      </View>
    )
  }
}

export default PracticeRandomFlashcards

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})