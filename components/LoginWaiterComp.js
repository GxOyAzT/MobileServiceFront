import React from 'react'
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native'

function LoginWaiterComp() {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.image} source={require('../images/icon.png')}/>
      <View style={{height: 50}}></View>
      <ActivityIndicator/>
    </View>
  )
}

export default LoginWaiterComp

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'absolute',
    top: '15%',
    width: '100%',
    alignContent: 'center'
  },

  image: {
    height: 300,
    width: 300,
    alignSelf: 'center'
  }
})