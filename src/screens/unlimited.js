import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Unlimited = () => {
  return (
    <View style={styles.container}>
      <Text>Unlimited</Text>
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

export default Unlimited