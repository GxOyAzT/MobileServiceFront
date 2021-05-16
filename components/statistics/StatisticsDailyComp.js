import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { getUserDailyRaport } from '../../api/statistics'

export class StatisticsDailyComp extends Component {
  constructor (props){
    super(props)

    this.state = {
      collectionId: props.collectionId === '' ? null : props.collectionId,
      totalFlashcards: null,
      newFlashcards: null,
      toLearnFlashcards: null,
      wasDownlanded: false
    }

    console.log(this.state.collectionId)
  }

  getData = async () => {
    var response; 
    if (this.state.collectionId === null){
      response = await getUserDailyRaport()
    }

    console.log(response.content)

    if (response.statusCode === 200){
      this.setState({
        totalFlashcards: response.content.totalFlashcards,
        newFlashcards: response.content.newFlashcards,
        toLearnFlashcards: response.content.toLearnFlashcards
      })
    }

    this.setState({
      wasDownlanded: true
    })
  }

  componentDidMount(){
    this.getData()
  }

  render() {
    return (
      <View style={styles.statContainer}>
        {this.state.wasDownlanded === false ? <ActivityIndicator style={styles.statContainerInner}/> :
        <View style={styles.statContainerInner}>
          <View style={styles.statItemContainer}>
            <Text style={styles.statItemHeader}>ALL</Text>
            <Text style={styles.statItemValue}>{this.state.totalFlashcards === null ? '-' : this.state.totalFlashcards}</Text>
          </View>
          <View style={styles.statItemContainerSeparator}></View>
          <View style={styles.statItemContainer}>
            <Text style={styles.statItemHeader}>NEW</Text>
            <Text style={styles.statItemValue}>{this.state.newFlashcards === null ? '-' : this.state.newFlashcards}</Text>
          </View>
          <View style={styles.statItemContainerSeparator}></View>
          <View style={styles.statItemContainer}>
            <Text style={styles.statItemHeader}>TO PRACTICE</Text>
            <Text style={styles.statItemValue}>{this.state.toLearnFlashcards === null ? '-' : this.state.toLearnFlashcards}</Text>
          </View>
        </View>}
      </View>
    )
  }
}

export default StatisticsDailyComp

const styles = StyleSheet.create({
  statContainer: {
    minWidth: '90%',
    marginVertical: '5%',
    flexDirection: 'row',
    minHeight: 50
  },

  statContainerInner: {
    flexDirection: 'row',
    minWidth: '100%'
  },

  statItemContainer: {
    flex: 1,
    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },

  statItemHeader: {
    color: 'gray',
    textAlign: 'center'
  },

  statItemValue: {
    textAlign: 'center',
    fontSize: 25
  },

  statItemContainerSeparator: {
    width: 3
  },
})