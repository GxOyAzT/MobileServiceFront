import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View, Text, StyleSheet, Keyboard, TextInput } from 'react-native'

export class ShrinkKeyboardComp extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={{backgroundColor: "purple"}}>Hello</Text>
            <TextInput style={{height: 40, width: 120, backgroundColor: 'blue'}}/>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

export default ShrinkKeyboardComp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  inner: {
    padding: 24,
    flex: 1,
    // justifyContent: "space-around",
    justifyContent: 'center',
    backgroundColor: 'red'
  },
})