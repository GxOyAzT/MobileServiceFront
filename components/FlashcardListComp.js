import React, { Component } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { getflashcardsListByCollectionId } from '../api/flashcard'
import { FlashcardListItemComp } from './FlashcardListItemComp'

export class FlashcardListComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      collectionId: props.collectionId,
      flashcardsList: null,
      reloadData: props.reloadData,
      manageFlashcardModalShow: props.manageFlashcardModalShow
    }
  }

  componentDidMount(){
    this.reloadFlashcards()
  }

  reloadFlashcards = async () => {
    var response = await getflashcardsListByCollectionId(this.state.collectionId)
    console.log(response.statusCode)
    if (response.statusCode === 200){
      this.setState({
        flashcardsList: response.content
      })
    }
    else{
      
    }

    
    console.log(this.state.flashcardsList)
    this.state.reloadData()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.collectionList === null ? <ActivityIndicator style={{flex: 1}}/> :
        <FlatList style={styles.flatList} data={this.state.flashcardsList} renderItem={({item}) => (<FlashcardListItemComp manageFlashcardModalShow={this.state.manageFlashcardModalShow} reloadFlashcards={this.reloadFlashcards} flashcard={item} />)} keyExtractor={item => item.id} ItemSeparatorComponent={({highlighted}) => <View style={{height: 2, backgroundColor: 'transparent'}}></View>}/>}
      </View>
    )
  }
}

export default FlashcardListComp

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },

  flatList: {
    flex: 1
  },

  bottomContainer: {
    flex: 1,
    maxHeight: 50
  },

  item: {
    height: 30,
    width: '100%',
    backgroundColor: 'red',
    marginTop: 10
  },

  createNewButton: {
    flex: 1,
    backgroundColor: 'green',
    margin: 5,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },

  createNewPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  }
})