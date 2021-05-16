import React, { Component } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, Dimensions, Alert  } from 'react-native'
import { getUserNextWeekExpired } from '../../api/statistics'
import { LineChart } from "react-native-chart-kit";

export class StatisticsNextWeekExpiredComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      chartData: null
    }
  }

  getDataForCharts = async () => {
    var response = await getUserNextWeekExpired()
    console.log('here')

    if (response.statusCode === 404){
      console.log('here')
      Alert.alert(
        'WARNING',
        'Cannot connect to the server. Check your Internet connection.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
            style: 'cancel'
          }
        ]
      )
    }

    this.setState({
      chartData: response.content
    })

    console.log(this.state.chartData)
  }

  componentDidMount() {
    this.getDataForCharts()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.chartData === null ? <ActivityIndicator/> : 
        <View>
          <Text style={styles.textHeader}>EXPIRED FLASHCARDS</Text>
          <Text style={[styles.textHeader, {fontSize: 15}]}>(next 7 days)</Text>
          <LineChart
          data={{
            labels: [
              this.state.chartData.todayDate, 
              this.state.chartData.tomorrowDate,
              this.state.chartData.threeDayDate,
              this.state.chartData.fourDayDate,
              this.state.chartData.fiveDayDate,
              this.state.chartData.sixDayDate],
            datasets: [
              {
                data: [
                  this.state.chartData.todayCount, 
                  this.state.chartData.tomorrowCount, 
                  this.state.chartData.threeDayCount,
                  this.state.chartData.fourDayCount,
                  this.state.chartData.fiveDayCount,
                  this.state.chartData.sixDayCount
                ]
              }
            ]
          }}
          // verticalLabelRotation={30}
          width={Dimensions.get("window").width - 16} // from react-native
          height={Dimensions.get("window").height * 0.4}
          fromZero={true}
          chartConfig={{
            // backgroundColor: "#e26a00",
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(66, 164, 191, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(130, 130, 130, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#3992AB"
            },
            horizontalLabelRotation: 90
          }}
          bezier
          style={{
            // marginVertical: 8,
            borderRadius: 15
          }}
        />
        </View>}
      </View>
    )
  }
}

export default StatisticsNextWeekExpiredComp

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 15
  },

  textHeader: {
    color: 'grey',
    fontSize: 20,
    textAlign: 'center'
  }
})