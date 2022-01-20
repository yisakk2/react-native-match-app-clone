import * as React from 'react'
import { StyleSheet, Modal, View, ScrollView, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import Icon from 'react-native-vector-icons/Feather'

Icon.loadFont()

const SelectModal = ({ visible, onClose, data, selectedData }) => {
  const context = React.useContext(FirebaseContext)
  const profile = context.profile

const handler = pick => {
  switch (data[0]) {
    case '혈액형':
      profile.bloodType = pick
      break
    case '지역':
      profile.region = pick
      break
    case '종교':
      profile.religion = pick
      break
    case '직업':
      profile.job = pick
      break
    case '체형':
      profile.bodyShape = pick
      break
  }
  context.updateState(context, { profile })
  context.updateFirestore(profile)
  onClose()
}

  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{data[0]}</Text>
          </View>
          <View style={{width: '100%', height: 2, backgroundColor: 'red'}}></View>
          <ScrollView style={{maxHeight: height - 140 > 560 ? 560 : 490}}>
            {data.slice(1).map(item => (
              <TouchableOpacity
                style={styles.listItem}
                key={item}
                onPress={() => handler(item)}
              >
                <Text style={styles.subs}>{item}</Text>
                <Icon name="check" color={selectedData === item ? 'red' : 'white'} size={32} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  )
}

const { width, height } = Dimensions.get('window');
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
    color: 'grey'
  },
  listItem: {
    width: width - 60,
    height: 70,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalBG: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: -1,
  },
})

export default SelectModal