import React, { Component } from 'react'
import { Text } from 'react-native'
import CollectionListComp from './CollectionListComp'
import CollectionViewComp from './CollectionViewComp'

export class PanelTwoComp extends Component {
  constructor(props){
    super(props)

    this.state = {
      displayPanel: 'collectionlist',
      objectId: null,
      showInformationPopup: props.showInformationPopup
    }
  }

  setPanelDisplay = (panelName, objectId) => {
    console.log(`panelName: ${panelName} objectId: ${objectId}`)
    this.setState({
      objectId: objectId
    })

    this.setState({
      displayPanel: panelName,
    })
  }

  render() {
    return this.state.displayPanel === 'collectionlist' ? <CollectionListComp showInformationPopup={this.state.showInformationPopup} setPanelDisplay={this.setPanelDisplay}/> : this.state.displayPanel === 'collection' ? <CollectionViewComp showInformationPopup={this.state.showInformationPopup} setPanelDisplay={this.setPanelDisplay} collectionId={this.state.objectId}/> : <Text>Not Found</Text>
  }
}

export default PanelTwoComp
