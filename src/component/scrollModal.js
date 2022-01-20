import * as React from 'react'
import { StyleSheet, Modal, View, ScrollView, Text, Dimensions, ToucahbleOpacity, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'

const ScrollModal = ({ visible, onClose, data, selectedData }) => {
  const context = React.useContext(FirebaseContext)
  const [height] = React.useState(Platform.OS === 'android' ? 59.80952453613281 : 60)
  const [pick, setPick] = React.useState(selectedData)
  const ref = React.useRef()

  const onSubmit = () => {
    const profile = context.profile
    profile.height = pick
    context.updateState(context, { profile })
    context.updateFirestore(profile)
    onClose()
  }

  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>키</Text>
          </View>
          <View style={{width: '100%', height: 2, backgroundColor: 'red'}}></View>
          <View style={styles.center}></View>
          <ScrollView 
            ref={ref}
            style={{height: 180}} 
            showsVerticalScrollIndicator={false}
            snapToAlignment={'start'}
            snapToInterval={60}
            initialListSize={30}
            onContentSizeChange={() => {
              ref.current.scrollTo({y: height * (selectedData - 140), animated: false})
            }}
            onMomentumScrollEnd={(event) => {
              // console.log(Math.ceil(event.nativeEvent.contentOffset.y / (Platform.OS === 'android' ? 59.80952453613281 : 60) + 140))
              setPick(Math.ceil(event.nativeEvent.contentOffset.y / (Platform.OS === 'android' ? 59.80952453613281 : 60) + 140))
            }}
          >
            {data.map(item => (
              <View style={styles.listItem} key={item}>
                <Text style={styles.subs}>{item === 0 || item === 62 ? '' : item + 139}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={{width: '100%', height: 1, backgroundColor: 'lightgrey'}}></View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={onClose}
            >
              <Text style={{fontSize: 18, color: 'grey'}}>취소</Text>
            </TouchableOpacity>
            <View style={{width: 1, height: 70, backgroundColor: 'lightgrey'}}></View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={onSubmit}
            >
              <Text style={{fontSize: 18, color: 'grey'}}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  )
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: width - 60,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: width - 60,
    height: 70,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: 'red'
  },
  subs: {
    fontSize: 18,
  },
  listItem: {
    width: width - 60,
    height: Platform.OS === 'android' ? 59.80952453613281 : 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: width * 0.5 - 31,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    top: 132,
    width: width - 80,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  modalBG: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: -1,
  },
})

export default ScrollModal