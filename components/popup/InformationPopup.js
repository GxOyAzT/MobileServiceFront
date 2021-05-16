import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export class InformationPopup extends Component {
  constructor(props){
    super(props)

    this.state = {
      hidePopup: props.hidePopup,
      message: props.message
    }
  }

  hidePopup = () =>{
    this.state.hidePopup()
  }

  render() {
    return (
      <TouchableOpacity onPress={this.hidePopup} style={styles.mainContainer}>
        <Text>
          {this.state.message}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default InformationPopup

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#BCB500',
    minHeight: 100,
    top: '5%',
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 20
  }
})