import React, { Component } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View, TextInput, StyleSheet, Modal, Alert } from 'react-native'
import { getCollectionAsync, deleteCollectionAsync, updateCollectionsAsync } from '../api/collection'
import DeleteConfirmationComp from './DeleteConfirmationComp'
import FlashcardListComp from './FlashcardListComp'
import ManageFlashcardComp from './ManageFlashcardComp'

export class CollectionViewComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      collectionId: props.collectionId,
      setPanelDisplay: props.setPanelDisplay,
      collection: null,
      modalVisible: false,
      flashcardForManageFlashcardComp: null,
      renderKey: Math.random(),
      deleteConfirmationCollection: false,
      showInformationPopup: props.showInformationPopup
    }
  }

  componentDidMount(){
    this.reloadData()
  }

  reloadData = async () => {
    var response = await getCollectionAsync(this.state.collectionId)

    if (response.statusCode === 200){
      console.log(response.content)
      this.setState({
        collection: response.content
      })
    }
    else{
      this.state.showInformationPopup('WARNING', 'CANNOT LOAD DATA')
    }
  }

  delete = async () => {
    await deleteCollectionAsync(this.state.collectionId)
    this.state.setPanelDisplay('collectionlist')
  }

  onChangeTextCollectionName = (text) => {
    var collection = this.state.collection

    collection.name = text
    this.setState({
      collection: collection
    })
  } 

  createNewFlashcardModalShow = () => {
    this.setState({
      modalVisible: true,
      flashcardForManageFlashcardComp: {
        foreign: '',
        native: '',
        id: '00000000-0000-0000-0000-000000000000',
        collectionId: this.props.collectionId
      }
    })
  }

  manageFlashcardModalShow = (flashcard) => {
    this.setState({
      flashcardForManageFlashcardComp: flashcard,
      modalVisible: true
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
      deleteConfirmationCollection: false
    })
  }

  forceRender = () => {
    this.setState({
      renderKey: Math.random()
    })

    this.reloadData()
  }

  saveCollectionName = async () => {
    var response = await updateCollectionsAsync({
      id: this.state.collection.id,
      name: this.state.collection.name
    })
  }

  showDeleteConfirmationCollectionPanel = () => {
    Alert.alert(
      'Delete confirmation',
      'Are you sure you want to delete this collection? All flashcards will be deleted also.',
      [
        {
          text: "Yes",
          onPress: () => this.delete(),
          style: 'destructive'
        },
        {
          text: "No",
          onPress: () => {},
          style: 'cancel'
        }
      ]
    )

    this.setState({
      deleteConfirmationCollection: true
    })
  }

  render() {
    return this.state.collection === null ? <ActivityIndicator style={{flex: 1}}/> : 
    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', padding: 10}}>
      <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} style={styles.createNewPanel}>
        <ManageFlashcardComp showInformationPopup={this.state.showInformationPopup} forceRender={this.forceRender} hideModal={this.hideModal} flashcard={this.state.flashcardForManageFlashcardComp}/>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={this.state.deleteConfirmationCollection} style={styles.createNewPanel}>
        <DeleteConfirmationComp confirmationMessage={`Are you sure you want to delete ${this.state.collection.name}?`} deleteCollection={this.delete} forceRender={this.forceRender} hideModal={this.hideModal} />
      </Modal>
      <View style={styles.collectionNameWrapper}>
        <View style={styles.inputText}>
          <Text style={styles.inputTextLabel}>NAME</Text>
          <TextInput onChangeText={text => this.onChangeTextCollectionName(text)} value={this.state.collection.name} style={styles.loginInput}/>
        </View>
        <TouchableOpacity style={styles.UpdateName} onPress={this.saveCollectionName}>
          <Text style={{textAlign: 'center', color: 'white'}}>UPDATE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statContainer}>
        <View style={styles.statItemContainer}>
          <Text style={styles.statItemHeader}>ALL</Text>
          <Text style={styles.statItemValue}>{this.state.collection.totalFlashcards}</Text>
        </View>
        <View style={styles.statItemContainerSeparator}></View>
        <View style={styles.statItemContainer}>
          <Text style={styles.statItemHeader}>NEW</Text>
          <Text style={styles.statItemValue}>{this.state.collection.newFlashcards}</Text>
        </View>
        <View style={styles.statItemContainerSeparator}></View>
        <View style={styles.statItemContainer}>
          <Text style={styles.statItemHeader}>TO PRACTICE</Text>
          <Text style={styles.statItemValue}>{this.state.collection.toLearnFlashcards}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonDelete} onPress={this.showDeleteConfirmationCollectionPanel}>
        <Text style={{textAlign: 'center', color: 'white'}}>DELETE</Text>
      </TouchableOpacity>
      <View style={{marginTop: 10, marginBottom: 10, flex: 1}}>
        <FlashcardListComp reloadData={this.reloadData} manageFlashcardModalShow={this.manageFlashcardModalShow} collectionId={this.state.collectionId} key={this.state.renderKey}/>
      </View>
      <TouchableOpacity style={styles.buttonCreateNewFLashcard} onPress={this.createNewFlashcardModalShow}>
        <Text style={{textAlign: 'center', color: '#fff'}}>CREATE NEW FLASHCARD</Text>
      </TouchableOpacity>
    </View>
  }
}

export default CollectionViewComp

const styles = StyleSheet.create({
  nameInput: {
    fontSize: 25,
    padding: 2,
    borderColor: '#1e1e1e',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    marginRight: 10
  },

  collectionNameWrapper: {
    flexDirection: 'row',
  },

  UpdateName: {
    maxWidth: 100,
    flex: 1,
    backgroundColor: '#609D37',
    borderRadius: 20,
    justifyContent: 'center',
    marginLeft: 10
  },

  buttonDelete: {
    fontSize: 40,
    backgroundColor: '#A63432',
    borderRadius: 100,
    paddingVertical: 10,
    color: '#000',
  },

  buttonCreateNewFLashcard: {
    fontSize: 40,
    backgroundColor: '#609D37',
    marginHorizontal: 5,
    borderRadius: 100,
    paddingVertical: 10,
    marginBottom: 3
  },

  createNewPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },

  createNewFlashcardPanel: {
    top: 100,
    height: 100,
    width: "80%",
    marginHorizontal: '10%',
    backgroundColor: 'red'
  },

  statContainer: {
    minWidth: '90%',
    marginVertical: '5%',
    flexDirection: 'row'
  },

  inputText: {
    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    flex: 1
  },

  inputTextLabel: {
    backgroundColor: '#703965',
    color: '#E6CEE2',
    padding: 2,
  },

  loginInput: {
    padding: 3,
    fontSize: 20,
    textAlign: 'center'
  },

  statItemContainer: {
    flex: 1,
    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },

  statItemContainerSeparator: {
    width: 3
  },

  statItemHeader: {
    color: 'gray',
    textAlign: 'center'
  },

  statItemValue: {
    textAlign: 'center',
    fontSize: 25
  }
})