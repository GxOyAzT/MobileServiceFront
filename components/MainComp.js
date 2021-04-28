import React from 'react'
import { StyleSheet, TextInput, View, Button, Text} from 'react-native'

export class MainComp extends React.Component {

  constructor(){
    super()

    this.state = {
      counter: 0,
      people: null
    }
  }

  increment = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  getPeople = async () => {
    var people = await getPeople()
    console.log(people)
    this.setState({
      people: people
    })
  }

  render() {


    return (
      <View>
        { this.state.people == null ? <Text style={textStyle.text}>NO DATA LOADED</Text> : this.state.people.map((e) => <Text key={e.id}>{e.id} {e.fullName}</Text>) }
        <Text>{this.state.counter}</Text>
        <TextInput value={this.state.counter}></TextInput>
        <Button onPress={this.increment} title="Learn More"></Button>
        <Button onPress={this.getPeople} title="Get People"></Button>
      </View>
    )
  }
}

const textStyle = StyleSheet.create({
  text: {
    backgroundColor: 'red',
    color: 'white'
  }
})

export default MainComp

async function getPeople(){
  var output = await fetch('http://mobile.somee.com/api/person').then(e => e.json());

  return output;
}