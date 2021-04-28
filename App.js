import React from 'react'
import { StyleSheet, View } from 'react-native'
import ApplicationComp from './components/ApplicationComp'
import CollectionListComp from './components/CollectionListComp'
import LoginComp from './components/LoginComp'
import ShrinkKeyboardComp from './components/ShrinkKeyboardComp'

export default function App() {
  return (
    <View style={styles.container}>
      <ApplicationComp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
