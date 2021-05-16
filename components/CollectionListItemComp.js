import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export class CollectionListItemComp extends Component {
  constructor(props){
    super(props)

    console.log(props.data)
    this.state = {
      data: props.data,
      setPanelDisplay: props.setPanelDisplay
    }
  }

  setPanelDisplay = () =>{
    this.state.setPanelDisplay('collection', this.state.data.id)
  }

  render() {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={this.setPanelDisplay}>
        <Text style={styles.text}>{this.state.data.name}</Text>
      </TouchableOpacity>
    )
  }
}

export default CollectionListItemComp

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: 60,
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  text: {
    fontSize: 20,
  }
})