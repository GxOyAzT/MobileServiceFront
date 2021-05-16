import React, { Component } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, Dimensions, Alert  } from 'react-native'
import { getUserAllFlashcardProgress } from '../../api/statistics'
import { PieChart } from "react-native-chart-kit";

export class StatisticsAllFlashcardsProgress extends Component {
  constructor(props){
    super(props)

    this.state = {
      chartData: null
    }
  }

  getDataForCharts = async () => {
    var response = await getUserAllFlashcardProgress()
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
          <Text style={styles.textHeader}>PROGRESS</Text>
          <Text style={[styles.textHeader, {fontSize: 15}]}>(All flashcards)</Text>
          <PieChart
            data={[
              {
                name: "New",
                population: this.state.chartData.newFlashcards,
                color: "#737373",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Base",
                population: this.state.chartData.baseKnowledge,
                color: "#BF671A",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Medium",
                population: this.state.chartData.mediumKnowledge,
                color: "#BFA11B",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Good",
                population: this.state.chartData.goodKnowledge,
                color: "#48C432",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Remembered",
                population: this.state.chartData.remebered,
                color: "#33C49B",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              }
            ]}
            width={Dimensions.get("window").width - 16}
            height={300}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(66, 164, 191, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(130, 130, 130, ${opacity})`,
              style: {
                borderRadius: 16
              },
              horizontalLabelRotation: 90
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
            absolute
            />
        </View>}
      </View>
    )
  }
}

export default StatisticsAllFlashcardsProgress

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