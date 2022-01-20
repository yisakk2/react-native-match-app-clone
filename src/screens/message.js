import * as React from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native'

const Message = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.listItem}></View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  listItem: {
    width: width,
    height: 80,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'lightgrey'
  }
})

export default Message