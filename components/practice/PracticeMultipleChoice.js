import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { getRandomExpiredFlashcardForChooseMode } from '../../api/practice'
import YouHaveNoFlashcard from './YouHaveNoFlashcard'
import PracticeMultipleChoiceItem from './PracticeMultipleChoiceItem'

export class PracticeMultipleChoice extends Component {
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

    var response = await getRandomExpiredFlashcardForChooseMode()

    if (response.statusCode === 200 | response.statusCode === 404){
      this.setState({
        flashcard: response.content,
        hasUserOwnFlashcard: response.content === null ? false : true
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
        {this.state.fetchProblemOccured ? <></> : this.state.hasUserOwnFlashcard === false ? <YouHaveNoFlashcard/> : this.state.flashcard === null ? <ActivityIndicator/> : <PracticeMultipleChoiceItem nextFlashcard={this.getFlashcard} flashcard={this.state.flashcard}/> }
      </View>
    )
  }
}

export default PracticeMultipleChoice

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})