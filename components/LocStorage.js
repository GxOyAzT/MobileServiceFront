import React, { Component } from 'react'
import { Button, TextInput, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class LocStorage extends Component {

  constructor (props){
    super(props)

    this.state = {
      textToSave: '',
      textSaved: ''
    }
  }

  save = async () => {
    var itemToSave = this.state.textToSave
    try {
      await AsyncStorage.setItem('login_token', itemToSave)
    }
    catch (e){
      console.log(e)
    }
  }

  show = async () => {
    try{
      const value = await AsyncStorage.getItem('login_token')
      this.setState({
        textSaved: value
      })
    }
    catch (e){

    }
  }

  inputChange = (e) => {
    console.log(e)
    this.setState({
      textToSave: e
    })
  }

  render() {
    return (
      <View>
        <TextInput onChangeText={text => this.inputChange(text)} value={this.state.textToSave}/>
        <Text>Text to save: {this.state.textToSave}</Text>
        <Button onPress={this.save} title={'Save'}></Button>
        <Button onPress={this.show} title={'Show'}></Button>
        <Text>{this.state.textSaved}</Text>
        {/* <textInput value={this.state.textSaved}/> */}
      </View>
    )
  }
}

export default LocStorage
