import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Block = () => {
  return (
    <View style={styles.container}>
      <Text>Block</Text>
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

export default Block