import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Choice = () => {
  return (
    <View style={styles.container}>
      <Text>Choice</Text>
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

export default Choice