import * as React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'

export const MyMessage = ({ message, time, checked }) => {
  return (
    <View style={[styles.listItem, {justifyContent: 'flex-end'}]}>
      <View>
        <Text style={{fontSize: 12, color: 'lightcoral', textAlign: 'right'}}>{checked === false ? 1 : ''}</Text>
        <Text style={{fontSize: 12}}>{time}</Text>
      </View>
      <View style={styles.myMessageContainer}>
        <Text>{message}</Text>
      </View>
    </View>
  )
}

export const PartnerMessage = ({ message, time, checked }) => {
  return (
    <View style={[styles.listItem, {justifyContent: 'flex-start'}]}>
      <View style={styles.partnerMessageContainer}>
        <Text>{message}</Text>
      </View>
      <View>
        <Text style={{fontSize: 12, color: 'lightcoral', textAlign: 'left'}}>{checked === false ? 1 : ''}</Text>
        <Text style={{fontSize: 12}}>{time}</Text>
      </View>
    </View>
  )
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  listItem: {
    width: width,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    padding: 10,
    marginLeft: 5,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'lightcoral'
  },
  partnerMessageContainer: {
    padding: 10,
    marginLeft: 10,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: 'whitesmoke'
  }
})

// export default { MyMessage, PartnerMessage }