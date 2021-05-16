import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'

export class NavigationComp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.navButton}><Image style={styles.buttonImage} source={require('../../images/home-icon.png')}/></TouchableOpacity>
        <View style={styles.navButtonSeparator}></View>
        <TouchableOpacity style={styles.navButton}><Text>2</Text></TouchableOpacity>
        <View style={styles.navButtonSeparator}></View>
        <TouchableOpacity style={styles.navButton}><Text>3</Text></TouchableOpacity>
      </View>
    )
  }
}

export default NavigationComp

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#eeeeee',
    borderRadius: 15,
    flexDirection: 'row'
  },

  navButton: {
    flex: 1,
    height: 60,
    marginHorizontal: '0.5%',
    alignItems: 'center'
  },

  navButtonImage: {
    height: 50,
    width: 50,
    marginVertical: 'auto'
  },

  buttonImage: {
    height: 60,
    width: 60,
  },

  navButtonSeparator: {
    top: 5,
    height: 50,
    width: 1,
    backgroundColor: '#1e1e1e',
  }
})