import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export class CollectionListItemComp extends Component {
  constructor(props){
    super(props)

    console.log(props.data)
    this.state = {
      data: props.data
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text>{this.state.data.name}</Text>
      </TouchableOpacity>
    )
  }
}

export default CollectionListItemComp

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: 60,
    backgroundColor: '#807F13',
    marginTop: 5,
    marginBottom: 5
  }
})