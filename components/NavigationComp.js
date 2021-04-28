import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Button, Text } from 'react-native'

export class NavigationComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      setViewHome: props.setViewHome,
      setViewTwo: props.setViewTwo
    }
  }

  setViewHome = () => {
    this.state.setViewHome()
  }

  setViewTwo = () => {
    this.state.setViewTwo()
  }

  render() {
    return (
      <View style={navStyles.container}>
        <TouchableOpacity onPress={this.setViewHome} style={navStyles.navButton}><Image style={navStyles.navButtonImage} source={require('../images/home-img.png')} /></TouchableOpacity>
        <TouchableOpacity onPress={this.setViewTwo} style={navStyles.navButton}><Text>Collection</Text></TouchableOpacity>
        <TouchableOpacity title={'Button 3'}></TouchableOpacity>
      </View>
    )
  }
}

const navStyles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: 25,
    height: 80,
    backgroundColor: '#2D2D2D',
    // backgroundColor: 'transparent',
    flexDirection: 'row'
  },

  navButton: {
    padding: 5,
    minWidth: '32%',
    height: 50,
    backgroundColor: '#2D2D2D',
    marginHorizontal: '0.5%',
    alignItems: 'center'
  },

  navButtonImage: {
    height: 40,
    width: 40,
    marginVertical: 'auto'
  }
})

export default NavigationComp