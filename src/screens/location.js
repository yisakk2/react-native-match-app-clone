import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Location = () => {
  return (
    <View style={styles.container}>
      <Text>Location</Text>
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

export default Location