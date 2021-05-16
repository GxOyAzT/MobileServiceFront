import React, { Component } from 'react'
import { View } from 'react-native'
import PracticeRandomFlashcards from './PracticeRandomFlashcards'
import PracticeTurnOverProgrss from './PracticeTurnOverProgrss'
import PracticeType from './PracticeType'
import PracticeMethodComp from './PraticeMethodComp'
import PracticeMultipleChoice from './PracticeMultipleChoice'

export class PracticeComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      view: 'choose'
    }
  }

  setPracticeMethod = (method) => {
    console.log(method)
    this.setState({
      view: method
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.view === 'choose' ? <PracticeMethodComp setPracticeMethod={this.setPracticeMethod}/> :  
        this.state.view === 'PracriceRandomFlashcards' ? <PracticeRandomFlashcards/> : 
        this.state.view === 'PracticeTurnOver' ? <PracticeTurnOverProgrss/> : 
        this.state.view === 'PracticeType' ? <PracticeType/> : 
        this.state.view === 'PracticeMultipleChoice' ? <PracticeMultipleChoice/> : <></>}
      </View>
    )
  }
}

export default PracticeComp