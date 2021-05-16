import React, { Component } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import { NavigationComp } from './NavigationComp'
import { HomeComp } from './HomeComp'
import { LoginComp } from './LoginComp'
import { PanelTwoComp } from '../components/PanelTwoComp'
import PracticeComp from './practice/PracticeComp'
import InformationPopup from './popup/InformationPopup'

export class ApplicationComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      view: 'home',
      isUserLoggedIn: false,
      isPopupVisible: false,
      popupMessage: '',
      popupHeader: '',
      stateIndicator: 0
    }
  }

  setViewHome = () => {
    console.log('setViewHome')
    this.setState({
      view: 'home',
      stateIndicator: this.state.stateIndicator + 1
    })
  }

  setViewTwo = () => {
    console.log('setViewTwo')
    this.setState({
      view: 'collectionlist',
      stateIndicator: this.state.stateIndicator + 1
    })
  }

  setViewThree = () => {
    console.log('setViewThree')
    this.setState({
      view: 'practice',
      stateIndicator: this.state.stateIndicator + 1
    })
  }

  setAsLoggedIn = () => {
    console.log('setAsLoggedIn()')
    this.setState({
      isUserLoggedIn: true
    })
  }

  logout = () => {
    console.log('logout()')
    this.setState({
      isUserLoggedIn: false
    })
  }

  showInformationPopup = (header, message) => {
    this.setState({
      popupMessage: message,
      popupHeader: header,
      isPopupVisible: true
    })
  }

  hidePopup = () => {
    this.setState({
      popupMessage: '',
      popupHeader: '',
      isPopupVisible: false
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#DCDCDC'}}>
        <Modal transparent={true} animationType='fade' visible={this.state.isPopupVisible}>
          <InformationPopup header={this.state.popupHeader} message={this.state.popupMessage} hidePopup={this.hidePopup}/>
        </Modal>
        <View style={{height: 25, backgroundColor: 'transparent'}}></View>
        { this.state.isUserLoggedIn ? 
        <View style={{flex: 1}}>
          <NavigationComp style={{flex: 1, height: 80}} setViewThree={this.setViewThree} setViewHome={this.setViewHome} setViewTwo={this.setViewTwo} actualView={this.state.view}/>
          <View style={{flex: 2, marginTop: 8}}>
            { this.state.view == 'home' ? <HomeComp key={this.state.stateIndicator} logout={this.logout}/> : this.state.view == 'collectionlist' ? <PanelTwoComp key={this.state.stateIndicator} showInformationPopup={this.showInformationPopup}/> : this.state.view === 'practice'? <PracticeComp key={this.state.stateIndicator}/> : <Text>Cannot find Component</Text> }
          </View>
        </View> :
        <LoginComp setAsLoggedIn={this.setAsLoggedIn}/> }
      </View>
    )
  }
}

export default ApplicationComp
