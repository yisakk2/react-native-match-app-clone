import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Card = () => {
  return (
    <View style={styles.container}>
      <Text>Card</Text>
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

export default Card