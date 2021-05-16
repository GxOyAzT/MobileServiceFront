import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export class DeleteConfirmationComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      confirmationMessage: props.confirmationMessage,
      deleteCollection: props.deleteCollection,
      forceRender: props.forceRender,
      hideModal: props.hideModal
    }
  }

  hideModal = () => {
    this.state.hideModal()
  }

  deleteCollection = () => {
    this.state.deleteCollection()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.message}>{this.state.confirmationMessage}</Text>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#609D37'}]} onPress={this.deleteCollection}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#A63432'}]} onPress={this.hideModal}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>NO</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default DeleteConfirmationComp

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1e1e1e',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 50,
    paddingVertical: 20,
    borderRadius: 30
  },

  button: {
    paddingVertical: 5,
    borderRadius: 50,
    marginHorizontal: 10,
    marginVertical: 5
  },
  
  message: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff'
  }
})