import React, { Component } from 'react'
import { PracticeTypeItem } from '../practice/PracticeTypeItem'
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import YouHaveNoFlashcard from './YouHaveNoFlashcard'
import { getRandomExpiredFlashcard } from '../../api/practice'
import PracticeTurnOverProgressItem from './PracticeTurnOverProgressItem'

export class PracticeType extends Component {
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

    var response = await getRandomExpiredFlashcard()

    if (response.statusCode === 200  | response.statusCode === 404){
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
        {this.state.fetchProblemOccured ? <></> : this.state.hasUserOwnFlashcard === false ? <YouHaveNoFlashcard/> : this.state.flashcard === null ? <ActivityIndicator/> : this.state.flashcard.practiceDirection === 1 ? <PracticeTypeItem nextFlashcard={this.getFlashcard} flashcard={this.state.flashcard}/> : <PracticeTurnOverProgressItem nextFlashcard={this.getFlashcard} flashcard={this.state.flashcard}/>}
      </View>
    )
  }
}

export default PracticeType

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})