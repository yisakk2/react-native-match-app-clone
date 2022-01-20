import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/FontAwesome'

Icon.loadFont()

const Page5 = ({ navigation }) => {
  const context = React.useContext(FirebaseContext)
  const [image, setImage] = React.useState('')
  const [available, setAvailable] = React.useState(false)

  const choosePhotoFromLibrary = () => {
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION).then(result => {
        switch (result) {
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            request(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION)
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            openLibrary()
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            openLibrary()
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Alert.alert(
              "안내",
              "접근 권한이 없습니다."
            )
            break;
        }
      })
    } else {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        switch (result) {
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            request(PERMISSIONS.IOS.PHOTO_LIBRARY)
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            openLibrary()
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            openLibrary()
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Alert.alert(
              "안내",
              "접근 권한이 없습니다."
            )
            break;
        }
      })
    }
  }

  const openLibrary = () => {
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      setAvailable(true)
      setImage(Platform.OS === 'android' ? image.path : image.sourceURL)
    });
  }

  const submit = () => {
    let filename = image.split('/')
    filename = filename[filename.length - 1]
    context.uploadImage(image, filename)
    navigation.navigate('Page6')
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 추가:</Text>
      <TouchableOpacity 
        style={styles.image}
        onPress={choosePhotoFromLibrary}
      >
        {image === '' ? 
          <Icon name="photo" color={'grey'} size={50} /> 
          :
          <Image style={{width: 250, height: 250, resizeMode: 'cover', borderRadius: 10}} source={{uri: image}} />
        }
      </TouchableOpacity>
      <Text style={{color: 'grey'}}>프로필에 표시되는 사진입니다.</Text>
      <TouchableOpacity
        style={[styles.submitBtn, {backgroundColor: available ? 'lightcoral' : 'whitesmoke'}]}
        disabled={!available}
        onPress={submit}
      >
        <Text style={{fontSize: 18, textAlign: 'center', color: available ? 'white' : 'grey'}}>완료</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    marginTop: 32,
    marginBottom: 12,
  },
  submitBtn: {
    width: width * 0.8,
    height: 50,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 48,
  }
})

export default Page5