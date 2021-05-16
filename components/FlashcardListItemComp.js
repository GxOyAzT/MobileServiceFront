import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image, Alert } from 'react-native'
import { deleteFlashcard } from '../api/flashcard'

export class FlashcardListItemComp extends Component {

  constructor(props){
    super(props)

    this.state = {
      flashcard: props.flashcard,
      reloadFlashcards: props.reloadFlashcards,
      manageFlashcardModalShow: props.manageFlashcardModalShow
    }
  }

  deleteFlashcard = async () => {
    Alert.alert(
      'Delete confirmation',
      'Are you sure you want to delete this flashcard?',
      [
        {
          text: "Yes",
          onPress: () => this.delete(),
          style: 'destructive'
        },
        {
          text: "No",
          onPress: () => {},
          style: 'cancel'
        }
      ]
    )
  }

  delete = async () => {
    var result = await deleteFlashcard(this.state.flashcard.id)

    if (result === 'OK'){
      console.log('Delete with success')
      this.state.reloadFlashcards()
    }
    else{
      console.log('Delete problem')
    }
  }

  manageFlashcardModalShow = async() => {
    this.state.manageFlashcardModalShow(this.state.flashcard)
  }

  render() {
    return (
      <TouchableOpacity onPress={this.manageFlashcardModalShow} style={styles.itemContainer}>
        <View style={styles.textWrappers}>
          <Text style={styles.text}>{this.state.flashcard.foreign}</Text>
          <Text style={[styles.text, {color: '#1e1e1e'}]}>{this.state.flashcard.native}</Text>
        </View>
        <TouchableOpacity style={styles.flashcardDeleteTO} onPress={this.deleteFlashcard}><Image style={styles.imgDeleteIcon} source={require('../images/bin-white-icon.png')}/></TouchableOpacity>
      </TouchableOpacity>
    )
  }
}

export default FlashcardListItemComp

const styles = StyleSheet.create({
  itemContainer: {
    margin: 3,
    flexDirection: 'row',

    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

    alignItems: 'center'
  },

  flashcardDeleteTO: {
    backgroundColor: '#A63432',
    width: '20%',
    height: 50,
    width: 50,
    borderRadius: 10,
    marginRight: 5
  },

  text: {
    fontSize: 20,
    padding: 2
  },

  textWrappers: {
    width: '80%',
    flex: 1
  },

  imgDeleteIcon: {
    height: 40,
    width: 40,
    margin: 5,
  }
})