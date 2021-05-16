import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { getRandomExpiredFlashcard } from '../../api/practice'
import PracticeTurnOverProgressItem from './PracticeTurnOverProgressItem'
import YouHaveNoFlashcard from './YouHaveNoFlashcard'

export class PracticeTurnOverProgrss extends Component {
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

    // this.setState({
    //   flashcard: flashcard,
    //   hasUserOwnFlashcard: flashcard === null ? false : true
    // })
  }

  componentDidMount(){
    this.getFlashcard()
    console.log(this.state.flashcard)
  }


  render() {
    return (
       <View style={styles.container}>
        {this.state.fetchProblemOccured ? <></> : this.state.hasUserOwnFlashcard === false ? <YouHaveNoFlashcard/> : this.state.flashcard === null ? <ActivityIndicator/> : <PracticeTurnOverProgressItem nextFlashcard={this.getFlashcard} flashcard={this.state.flashcard}/>}
      </View>
    )
  }
}

export default PracticeTurnOverProgrss

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})