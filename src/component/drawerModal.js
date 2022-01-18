import * as React from 'react'
import { StyleSheet, View, ScrollView, Text, Image, Modal, TouchableOpacity, TouchableWithoutFeedback, Dimensions, SafeAreaView, StatusBar, Platform } from 'react-native'

const DrawerModal = ({ visible, onClose, charge, unlimited, block, attract, setting, notification, ask }) => {
  return (
    <Modal visible={visible} animationType='none' transparent>
      <SafeAreaView style={styles.modal}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image 
              style={styles.imageCirles}
              source={require('../../assets/profile.jpeg')} 
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.listItemDivided}>
              <Text>하트 충전</Text>
              <Text style={{color: 'red'}}>*EVENT*</Text>
            </TouchableOpacity>
            <View style={{width: 1, height: 60, backgroundColor: 'lightgrey'}}></View>
            <TouchableOpacity style={styles.listItemDivided}>
              <Text>좋아요</Text>
              <Text>무제한 권</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem}>
            <Text style={{fontSize: 16}}>지인차단</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem}>
            <Text style={{fontSize: 16}}>내 매력도 보기</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem} onPress={setting}>
            <Text style={{fontSize: 16}}>설정</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem}>
            <Text style={{fontSize: 16}}>공지/FAQ</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem}>
            <Text style={{fontSize: 16}}>1:1 문의</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
        </ScrollView>
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: Platform.OS === 'android' ? width * 0.3 : width * 0.2,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  imageContainer: {
    height: 180,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    justifyContent: 'center',
    padding: 40, 
  },
  imageCirles: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff'
  },
  listItem: {
    height: 60,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  listItemDivided: {
    width: Platform.OS === 'android' ? width * 0.35 - 1 : width * 0.4 - 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    height: 1,
    backgroundColor: 'lightgrey'
  },
  modalBG: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: -1
  },
})

export default DrawerModal