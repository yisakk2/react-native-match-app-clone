import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Match = () => {
  return (
    <View style={styles.container}>
      <Text>Match</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Match