import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'

export class NavigationComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      setViewHome: props.setViewHome,
      setViewTwo: props.setViewTwo,
      setViewThree: props.setViewThree,
      actualView: props.actualView
    }
  }

  setViewHome = () => {
    this.state.setViewHome()
    this.setState({
      actualView: 'home'
    })
  }

  setViewTwo = () => {
    this.state.setViewTwo()
    this.setState({
      actualView: 'collectionlist'
    })
  }

  setViewThree = () => {
    this.state.setViewThree()
    this.setState({
      actualView: 'practice'
    })
  }

  render() {
    return (
      <View style={navStyles.container}>
        <TouchableOpacity onPress={this.setViewHome} style={this.state.actualView === 'home' ? navStyles.navButtonClickedLeft : navStyles.navButton}><Image style={navStyles.navButtonImage} source={this.state.actualView === 'home' ? require('../images/home-white-icon-v2.png') : require('../images/home-black-icon-v2.png')}/></TouchableOpacity>
        <TouchableOpacity onPress={this.setViewTwo} style={this.state.actualView === 'collectionlist' ? navStyles.navButtonClickedCenter : navStyles.navButton}><Image style={navStyles.navButtonImage} source={this.state.actualView === 'collectionlist' ? require('../images/flashcardManage-white-icon-v2.png') : require('../images/flashcardManage-black-icon-v2.png')}/></TouchableOpacity>
        <TouchableOpacity onPress={this.setViewThree} style={this.state.actualView === 'practice' ? navStyles.navButtonClickedRight : navStyles.navButton}><Text>Practice</Text></TouchableOpacity>
      </View>
    )
  }
}

const navStyles = StyleSheet.create({
  // container: {
  //   padding: 0,
  //   paddingTop: 25,
  //   height: 80,
  //   backgroundColor: '#2D2D2D',
  //   flexDirection: 'row'
  // },

  container: {
    // height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: "96%",
    marginHorizontal: '2%',
    borderRadius: 10,
    marginBottom: 4,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  navButton: {
    padding: 5,
    // minWidth: '32%',
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: '0.5%',
    alignItems: 'center',
    borderRadius: 10
  },

  navButtonClickedLeft: {
    padding: 5,
    minWidth: '32%',
    height: 50,
    backgroundColor: '#8A00BA',
    alignItems: 'center',
    borderRadius: 10,
    height: '100%', 
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },

  navButtonClickedCenter: {
    padding: 5,
    minWidth: '32%',
    height: 50,
    backgroundColor: '#8A00BA',
    alignItems: 'center',
    borderRadius: 10,
    height: '100%', 
    borderRadius: 0
  },

  navButtonClickedRight: {
    padding: 5,
    minWidth: '32%',
    height: 50,
    backgroundColor: '#8A00BA',
    alignItems: 'center',
    borderRadius: 10,
    height: '100%', 
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },

  navButtonImage: {
    height: 40,
    width: 40,
    marginVertical: 'auto',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
})

export default NavigationComp