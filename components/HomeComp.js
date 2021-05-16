import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StatisticsWeekComp from './statistics/StatisticsWeekComp'
import StatisticsDailyComp from './statistics/StatisticsDailyComp'
import StatisticsNextWeekExpiredComp from './statistics/StatisticsNextWeekExpiredComp'
import StatisticsAllFlashcardsProgress from './statistics/StatisticsAllFlashcardsProgress'

export class HomeComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      logout: props.logout
    }
  }

  logout = async () => {
    await AsyncStorage.removeItem('login_token');
    this.state.logout()
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#DCDCDC', alignContent: 'center'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: '90%', marginHorizontal: '5%'}}>
            <StatisticsDailyComp collectionId={''}/>
          </View>
          <View style={{flex: 1}}>
            <StatisticsWeekComp/>
            <StatisticsNextWeekExpiredComp/>
            <StatisticsAllFlashcardsProgress/>
          </View>
        </ScrollView>
        
        <TouchableOpacity style={styles.logouButton} onPress={this.logout}>
          <Text style={{textAlign: 'center', color: '#E6CEE2', fontSize: 17}}>Logout</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

export default HomeComp

const styles = StyleSheet.create({
  // someWrapper: {
  //   shadowColor: "#000",
  //   shadowOffset: {
  //   width: 0,
  //   height: 10,
  //   },
  //   shadowOpacity: 0.51,
  //   shadowRadius: 13.16,

  //   elevation: 20,
  //   backgroundColor: '#fff',
  //   height: 100,
  //   width: 100,
  //   marginHorizontal: '40%',
  //   borderRadius: 5,
  //   marginTop: 10
  // },

  logouButton: {
    fontSize: 40,
    backgroundColor: '#703965',
    marginHorizontal: 5,
    borderRadius: 100,
    paddingVertical: 10,
    marginBottom: 10
  }
})