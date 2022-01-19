import * as React from 'react'
import { Modal, View, ActivityIndicator } from 'react-native'

const Loading = ({ visible }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    </Modal>
  )
}

export default Loading