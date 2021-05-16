import React, { Component } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, Dimensions } from 'react-native'
import { updateFlashcardProgress } from '../../api/statistics'
import {
  LineChart,
} from "react-native-chart-kit";

export class StatisticsWeekComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      chartData: null
    }
  }

  getDataForCharts = async () => {
    this.setState({
      chartData: await updateFlashcardProgress()
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
          <Text style={styles.textHeader}>TURNS OVER</Text>
          <Text style={[styles.textHeader, {fontSize: 15}]}>(last 7 days)</Text>
          <LineChart
          data={{
            labels: [
              this.state.chartData.sixDayBeforeDate, 
              this.state.chartData.fiveDayBeforeDate, 
              this.state.chartData.fourDayBeforeDate,
              this.state.chartData.threeDayBeforeDate,
              this.state.chartData.yesterdayDate,
              this.state.chartData.todayDate],
            datasets: [
              {
                data: [
                  this.state.chartData.sixDayBeforeCount,
                  this.state.chartData.fiveDayBeforeCount,
                  this.state.chartData.fourDayBeforeCount,
                  this.state.chartData.threeDayBeforeCount,
                  this.state.chartData.yesterdayCount,
                  this.state.chartData.todayCount
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
            color: (opacity = 1) => `rgba(128, 181, 127, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(130, 130, 130, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#4F874E"
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

export default StatisticsWeekComp

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