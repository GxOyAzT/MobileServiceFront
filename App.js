import React from 'react'
import { StyleSheet, View } from 'react-native'
import ApplicationComp from './components/ApplicationComp'


export default function App() {
  return (
    <View style={styles.container}>
      <ApplicationComp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
