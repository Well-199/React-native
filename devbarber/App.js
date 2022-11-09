import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const App = () => {

  return(
    <View style={styles.container}>
      <Text>DEV-BARBER</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
})

export default App