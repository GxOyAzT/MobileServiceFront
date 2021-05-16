import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import CollectionListItemComp from './CollectionListItemComp'
import { getCollectionsAsync } from '../api/collection'
import CreateCollectionComp from './CreateCollectionComp'

export class CollectionListComp extends Component {

  constructor(props){
    super(props)

    this.state = {
      data: null,
      modalVisible: false,
      setPanelDisplay: props.setPanelDisplay,
      showInformationPopup: props.showInformationPopup
    }
  }

  componentDidMount(){
    this.reloadData()
  }

  reloadData = async () => {
    var response = await getCollectionsAsync()

    if (response.statusCode === 200){
      this.setState({
        data: response.content
      })
    }
    else {
      this.state.showInformationPopup('WARNING', 'CANNOT DO SOMETHING...')
    }
    
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
          <CreateCollectionComp hideModalCreateNew={this.hideModalCreateNew} reloadData={this.reloadData}/>
        </Modal>
        {this.state.data === null ? <ActivityIndicator style={{flex: 1}}/> :
        <FlatList style={styles.flatList} data={this.state.data} renderItem={({item}) => (<CollectionListItemComp setPanelDisplay={this.state.setPanelDisplay} data={item}/>)} keyExtractor={item => item.id} />}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.createNewButton} onPress={this.showModalCreateNew}>
            <Text style={{color: 'white', textAlign: 'center'}}>CREATE FOLDER</Text>
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
    justifyContent: 'center',
    alignContent: 'center'
  },

  flatList: {
    flex: 1,
    paddingHorizontal: 10,
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
    backgroundColor: '#609D37',
    marginHorizontal: 5,
    borderRadius: 100,
    paddingVertical: 10,
    marginBottom: 10
  },

  createNewPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  }
})