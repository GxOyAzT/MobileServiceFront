import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class HomeComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      logout: props.logout
    }
  }

  logout = async () => {
    await AsyncStorage.removeItem('login_token');
    this.state.logout()
  }

  render() {
    return (
      <View>
        <Text>Home Component</Text>
        <TouchableOpacity onPress={this.logout}><Text>Logout</Text></TouchableOpacity>
      </View>
    )
  }
}

export default HomeComp
