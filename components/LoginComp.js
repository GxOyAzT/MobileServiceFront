import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, Platform, TouchableOpacity, CheckBox } from 'react-native'
import { login, checkToken } from '../api/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class LoginComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      setAsLoggedIn: props.setAsLoggedIn,
      wasTokenChecked: false,
      username: '',
      password: '',
    }
  }
  
  setAsLoggedIn = async () => {
    var response = await login(this.state.username, this.state.password)

    if (response.isSuccess === true){
      console.log('LOGIN PASS OK')
      var itemToSave = this.state.textToSave
      try {
        await AsyncStorage.removeItem('login_token');
      }
      catch (e){
        console.log('CANNOT REMOVE ITEM')
      }
      try {
        console.log(response.token)
        await AsyncStorage.setItem('login_token', response.token)
      }
      catch (e){
        console.log('CANNOT SET ITEM')
      }
      this.state.setAsLoggedIn()
    }
    else{
      console.log('LOGIN PASS NOT OK')
    }
  }

  onChangeTextUsername = (text) => {
    this.setState({
      username: text
    })
  }

  onChangeTextPassword = (text) => {
    this.setState({
      password: text
    })
  }

  async componentDidMount(){
    if (this.state.wasTokenChecked === false){
      try{
        const value = await AsyncStorage.getItem('login_token')
        console.log(`login_token: ${value}`)
        var response = await checkToken(value)
        if (response.isSuccess === true){
          console.log('TOKEN OK LOGING...')
          this.state.setAsLoggedIn()
        }
        else{
          console.log('TOKEN NOT OK LOGING...')
        }
      }
      catch (e){
  
      }
      this.setState({
        wasTokenChecked: true
      })
    }
  }

  render() {
    return (
      <View>
        <View style={LoginCompStyle.header}></View>
        <View style={LoginCompStyle.content}>
          <Text>username</Text>
          <TextInput onChangeText={text => this.onChangeTextUsername(text)} value={this.state.username} style={LoginCompStyle.loginInput}/>

          <Text>password</Text>
          <TextInput secureTextEntry={true} onChangeText={text => this.onChangeTextPassword(text)} value={this.state.password} style={LoginCompStyle.loginInput}/>
          <TouchableOpacity onPress={this.setAsLoggedIn}><Text>Login</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default LoginComp

const LoginCompStyle = StyleSheet.create({
  header: {
    backgroundColor: Platform.OS === 'ios' ? '#2D2D2D' : 'transparent',
    height: 22
  },

  loginInput: {
    padding: 3,
    fontSize: 20,
    borderColor: '#1e1e1e',
    borderWidth: 2,
    borderRadius: 5
  },

  content: {
    padding: 10,
  }
})