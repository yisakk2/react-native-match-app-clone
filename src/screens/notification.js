import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
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

export default Notification