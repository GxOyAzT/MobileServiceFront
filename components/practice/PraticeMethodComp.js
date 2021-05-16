import React, { Component } from 'react'
import { TouchableOpacity, View, Text, ScrollView, StyleSheet } from 'react-native'

export class PraticeMethodComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      setPracticeMethod: props.setPracticeMethod
    }
  }

  setPracriceRandomFlashcards = () => {
    this.state.setPracticeMethod('PracriceRandomFlashcards')
  }

  setPracticeTurnOver = () => {
    this.state.setPracticeMethod('PracticeTurnOver')
  }

  setPracticeType = () => {
    this.state.setPracticeMethod('PracticeType')
  }

  setPracticeMultipleChoice = () => {
    this.state.setPracticeMethod('PracticeMultipleChoice')
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', padding: 20}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={this.setPracriceRandomFlashcards}>
              <Text>Random</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.setPracticeTurnOver}>
              <Text>Turn Over</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={this.setPracticeType}>
              <Text>Type</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.setPracticeMultipleChoice}>
              <Text>Choose</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
    </View>
      
    )
  }
}

export default PraticeMethodComp

const styles = StyleSheet.create({
  row: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginVertical: 10
  },

  button: {
    height: 200,
    width: '48%',
    marginHorizontal: '1%',
    backgroundColor: '#fff',
    justifyContent: 'center',

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.43,
    // shadowRadius: 9.51,

    // elevation: 15,
  }
})