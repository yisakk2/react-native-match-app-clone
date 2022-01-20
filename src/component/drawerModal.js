import * as React from 'react'
import { StyleSheet, View, ScrollView, Text, Image, Modal, TouchableOpacity, TouchableWithoutFeedback, Dimensions, SafeAreaView, Platform, ImageBackground } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import storage from '@react-native-firebase/storage'

const DrawerModal = ({ visible, onClose, profile, charge, unlimited, block, attract, setting, notification, ask }) => {
  const context = React.useContext(FirebaseContext)
  const [image, setImage] = React.useState('')

  const getProfileImage = async () => {
    let ref = storage().ref(context.profile.image)
    let imageURL = await ref.getDownloadURL()
    context.updateState(context, {image: imageURL})
    setImage(imageURL)
  }

  React.useEffect(() => {
    context.image === null ? getProfileImage() : setImage(context.image)
  }, [context.image])

  return (
    <Modal visible={visible} animationType='none' transparent>
      <SafeAreaView style={styles.modal}>
        <ScrollView>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={profile}
          >
            <ImageBackground
              style={styles.imageBackground}
              source={{uri: image}}
              blurRadius={2}
            >
              <View style={styles.imageTopContainer}>
                <Image 
                  style={styles.imageCirles}
                  source={{uri: image}}
                />
                <View style={styles.textContainer}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 12, color: 'white'}}>{context.profile.nickname}</Text>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>프로필 보기</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.listItemDivided} onPress={charge}>
              <Text>하트 충전</Text>
              <Text style={{color: 'red'}}>*EVENT*</Text>
            </TouchableOpacity>
            <View style={{width: 1, height: 60, backgroundColor: 'lightgrey'}}></View>
            <TouchableOpacity style={styles.listItemDivided} onPress={unlimited}>
              <Text>좋아요</Text>
              <Text>무제한 권</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem} onPress={block}>
            <Text style={{fontSize: 16}}>지인차단</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem} onPress={attract}>
            <Text style={{fontSize: 16}}>내 매력도 보기</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem} onPress={setting}>
            <Text style={{fontSize: 16}}>설정</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem} onPress={notification}>
            <Text style={{fontSize: 16}}>공지/FAQ</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.listItem} onPress={ask}>
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
    right: width * 0.2,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  imageContainer: {
    backgroundColor: 'lightgrey',
  },
  imageBackground: {
    width: '100%',
    height: 200,
  },
  imageTopContainer: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)'
  },
  imageCirles: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
  },
  textContainer: {
    width: width * 0.8 - 160,
    height: 120,
    justifyContent: 'center',
    padding: 20,
  },
  listItem: {
    height: 60,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  listItemDivided: {
    width: width * 0.4 - 1,
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