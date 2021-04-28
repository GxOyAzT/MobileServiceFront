import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { NavigationComp } from './NavigationComp'
import { HomeComp } from './HomeComp'
import { PanelTwoComp } from './PanelTwoComp'
import { LoginComp } from './LoginComp'
import CollectionListComp from './CollectionListComp'

export class ApplicationComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      view: 'home',
      isUserLoggedIn: false
    }
  }

  setViewHome = () => {
    console.log('setViewHome')
    this.setState({
      view: 'home'
    })
  }

  setViewTwo = () => {
    console.log('setViewTwo')
    this.setState({
      view: 'collectionlist'
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

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.isUserLoggedIn ? 
        <View style={{flex: 1}}>
          <NavigationComp style={{flex: 1, height: 80}} setViewHome={this.setViewHome} setViewTwo={this.setViewTwo}/>
          <View style={{flex: 2}}>
            { this.state.view == 'home' ? <HomeComp logout={this.logout}/> : this.state.view == 'collectionlist' ? <CollectionListComp/> : <Text>Cannot find Component</Text> }
          </View>
        </View> :
        <LoginComp setAsLoggedIn={this.setAsLoggedIn}/> }
      </View>
    )
  }
}

export default ApplicationComp
