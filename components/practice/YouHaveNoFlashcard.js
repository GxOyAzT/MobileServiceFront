import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function YouHaveNoFlashcard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You have no more flashcard to practice today.</Text>
    </View>
  )
}

export default YouHaveNoFlashcard

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: '5%'
  },

  text: {
    textAlign: 'center',
    fontSize: 30
  }
})