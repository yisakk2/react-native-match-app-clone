import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Connect = () => {
  return (
    <View style={styles.container}>
      <Text>Connect</Text>
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

export default Connect