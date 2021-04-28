import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import CollectionListItemComp from './CollectionListItemComp'
import { getCollectionsAsync } from '../api/collection'

export class CollectionListComp extends Component {

  constructor(props){
    super(props)

    this.state = {
      data: null,
      modalVisible: false
    }
  }

  async componentDidMount(){
    var data = await getCollectionsAsync()
    this.setState({
      data: data
    })
  }

  showModalCreateNew = () => {
    this.setState({
      modalVisible: true
    })
  }

  hideModalCreateNew = () => {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} style={styles.createNewPanel}>
          <View style={styles.mainContainer, {backgroundColor: 'red', height: 200, width: '90%', marginHorizontal: '5%', marginTop: 50}}>
            <TouchableOpacity style={styles.createNewButton} onPress={this.hideModalCreateNew}>
              <Text style={{fontSize: 25, color: 'white', textAlign: 'center'}}>Create Folder</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {this.state.data === null ? <ActivityIndicator style={{flex: 1}}/> :
        <FlatList style={styles.flatList} data={this.state.data} renderItem={({item}) => (<CollectionListItemComp data={item}/>)} keyExtractor={item => item.id} />}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.createNewButton} onPress={this.showModalCreateNew}>
            <Text style={{fontSize: 25, color: 'white', textAlign: 'center'}}>Create Folder</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default CollectionListComp

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },

  flatList: {
    flex: 1,
    paddingHorizontal: 3,
    paddingVertical: 5
  },

  bottomContainer: {
    flex: 1,
    maxHeight: 50
  },

  item: {
    height: 30,
    width: '100%',
    backgroundColor: 'red',
    marginTop: 10
  },

  createNewButton: {
    flex: 1,
    backgroundColor: 'green',
    margin: 5,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },

  createNewPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  }
})