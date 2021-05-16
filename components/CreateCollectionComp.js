import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { createCollectionsAsync } from '../api/collection'

export class CreateCollectionComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      collectionName: '',
      hideModalCreateNew: props.hideModalCreateNew,
      reloadData: props.reloadData
    }
  }

  hideModalCreateNew = () => {
    this.state.hideModalCreateNew()
  }

  onChangeTextCollectionName = (text) => {
    this.setState({
      collectionName: text
    })
  }

  onPressCreateCollection = async () => {
    var response = await createCollectionsAsync(this.state.collectionName)
    
    if (response.statusCode === 200){
      this.state.reloadData()
      this.state.hideModalCreateNew()
      return
    }

    Alert.alert(
      'WARNING',
      response.content,
      [
        {
          text: 'OK',
          onPress: () => console.log('OK'),
          style: 'cancel'
        }
      ]
    )
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.inputText}>
            <Text style={styles.inputTextLabel}>FOLDER NAME</Text>
            <TextInput onFocus={this.onFocusTextInput} onChangeText={text => this.onChangeTextCollectionName(text)} value={this.state.collectionName} style={styles.loginInput}/>
          </View>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#609D37'}]} onPress={this.onPressCreateCollection}>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>CREATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#A63432'}]} onPress={this.hideModalCreateNew}>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>DISCARD</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

export default CreateCollectionComp

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 50,
    paddingVertical: 20
  },

  collectionNameInput: {
    backgroundColor: '#fff',
    padding: 3,
    margin: 10,
    fontSize: 20
  },

  button: {
    paddingVertical: 5,
    borderRadius: 50,
    marginHorizontal: 10,
    marginVertical: 5
  },

  inputText: {
    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,

    marginHorizontal: 10,
    marginVertical: 5
  },

  inputTextLabel: {
    backgroundColor: '#703965',
    color: '#E6CEE2',
    padding: 2,
  },

  loginInput: {
    padding: 3,
    fontSize: 20,
    textAlign: 'center'
  }
})