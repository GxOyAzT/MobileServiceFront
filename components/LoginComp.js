import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ActivityIndicator, Image, KeyboardAvoidingView } from 'react-native'
import { login, checkToken } from '../api/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginWaiterComp from './LoginWaiterComp'

export class LoginComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      setAsLoggedIn: props.setAsLoggedIn,
      wasTokenChecked: false,
      username: '',
      password: '',
      loginInProcess: false,
      incorrectLoginOrPassword: false
    }
  }
  
  setAsLoggedIn = async () => {
    this.setState({
      loginInProcess: true
    })

    var response = await login(this.state.username, this.state.password)

    if (response.isSuccess === true){
      try {
        await AsyncStorage.removeItem('login_token');
      }
      catch (e){
      }
      try {
        console.log(response.token)
        await AsyncStorage.setItem('login_token', response.token)
      }
      catch (e){
      }
      this.state.setAsLoggedIn()
    }
    else{
      this.setState({
        incorrectLoginOrPassword: true
      })
    }

    this.setState({
      loginInProcess: false
    })
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

  componentDidMount(){
    this.wasTokenChecked();
  }

  wasTokenChecked = async () => {
    if (this.state.wasTokenChecked === false){
      try{
        const value = await AsyncStorage.getItem('login_token')
        var response = await checkToken(value)
        if (response.isSuccess === true){
          this.state.setAsLoggedIn()
        }
        else{
        }
      }
      catch (e){
  
      }
      this.setState({
        wasTokenChecked: true
      })
    }
  }

  onFocusTextInput = () => {
    this.setState({
      incorrectLoginOrPassword: false
    })
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        { this.state.wasTokenChecked === false ? <LoginWaiterComp/> :
        <View style={LoginCompStyle.content}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Image style={LoginCompStyle.image} source={require('../images/icon.png')}></Image>
            <View style={LoginCompStyle.inputText}>
              <Text style={LoginCompStyle.inputTextLabel}>USERNAME</Text>
              <TextInput onFocus={this.onFocusTextInput} onChangeText={text => this.onChangeTextUsername(text)} value={this.state.username} style={LoginCompStyle.loginInput}/>
            </View>

            <View style={{height: 15}}></View>

            <View style={LoginCompStyle.inputText}>
              <Text style={LoginCompStyle.inputTextLabel}>PASSWORD</Text>
              <TextInput onFocus={this.onFocusTextInput} secureTextEntry={true} onChangeText={text => this.onChangeTextPassword(text)} value={this.state.password} style={LoginCompStyle.loginInput}/>
            </View>

            <View style={{height: 15}}></View>
            
            <TouchableOpacity style={LoginCompStyle.loginButton} onPress={this.setAsLoggedIn}>
              { this.state.loginInProcess ? <ActivityIndicator style={{color: '#0000ff', size: 'small'}}/> : <Text style={{textAlign: 'center', color: '#E6CEE2', fontSize: 17}}>LOGIN</Text> }
            </TouchableOpacity>
          </KeyboardAvoidingView>
          { this.state.incorrectLoginOrPassword ? <Text style={{color: '#673438', textAlign: 'center'}}>Incorrect username or password</Text> : <View></View> }
        </View>
         }
      </View>
    )
  }
}

export default LoginComp

const LoginCompStyle = StyleSheet.create({
  loginInput: {
    padding: 3,
    fontSize: 20,
    textAlign: 'center'
  },

  content: {
    padding: 10,
    flex: 1,
    position: 'absolute',
    top: '2%',
    width: '100%'
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
  },

  inputTextLabel: {
    backgroundColor: '#703965',
    color: '#E6CEE2',
    padding: 2,
  },

  loginButton: {
    backgroundColor: '#703965',
    padding: 10,
    borderRadius: 30
  },

  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  }
})