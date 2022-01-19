import * as React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'

const LoadingPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>심쿵</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightcoral'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 15,
  }
})

export default LoadingPage