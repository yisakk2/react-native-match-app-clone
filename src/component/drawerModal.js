import * as React from 'react'
import { StyleSheet, View, Text, Modal, TouchableWithoutFeedback, Dimensions, SafeAreaView } from 'react-native'

const DrawerModal = ({ visible, onClose, }) => {
  return (
    <Modal visible={visible} animationType='none' transparent>
      <SafeAreaView style={styles.modal}>
        <View styles={styles.container}>
          <Text>Hello</Text>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBG} />
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    flex: 7,
    zIndex: 300,
  },
  container: {
    width: width * 0.6,
    backgroundColor: 'white'
  },
  modalBG: {
    flex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    // width: width,
    // height: height,
    zIndex: -1
  },
})

export default DrawerModal