import * as React from 'react'
import { StyleSheet, View, ScrollView, Text, Image, Dimensions, TouchableOpacity, Alert, Platform } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import SelectModal from '../component/selectModal'
import ScrollModal from '../component/scrollModal'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/Feather'

Icon.loadFont()

const MyProfile = () => {
  const context = React.useContext(FirebaseContext)
  const [image, setImage] = React.useState(context.image)
  const [select, setSelect] = React.useState('')
  const [scroll, setScroll] = React.useState('')
  const [input, setInput] = React.useState('')
  const [data, setData] = React.useState([])
  const [heightData] = React.useState([ ...Array(63).keys() ])
  const [selectedData, setSelectedData] = React.useState('')

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
      let url =  Platform.OS === 'android' ? image.path : image.sourceURL
      let filename = url.split('/')
      filename = filename[filename.length - 1]
      context.uploadDownloadImage(url, filename)
      setImage(url)
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center', padding: 24}}>
          <TouchableOpacity onPress={choosePhotoFromLibrary}>
            <Image
              style={styles.image}
              source={{uri: image}}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.listItemHalf}
              activeOpacity={1}
              onPress={() => {
                Alert.alert(
                  "나이수정",
                  "1:1 문의로 신분증의 성함과 생년월일 부분만 찍어 첨부해서 보내주시면 확인 후 수정해 드립니다."
                )
              }}
            >
              <Text style={styles.labelLeft}>나이</Text>
              <Text style={styles.textLeft}>{context.profile.age}세</Text>
              <Icon name="check" color={context.profile.age !== '' ? 'green' : 'white'} size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItemHalf}
              activeOpacity={1}
              onPress={() => {
                setSelect('visible')
                setData(['혈액형', 'A형', 'B형', 'O형', 'AB형'])
                setSelectedData(context.profile.bloodType)
              }}
            >
              <Text style={styles.labelRight}>혈액형</Text>
              <Text style={styles.textRight}>{context.profile.bloodType}</Text>
              <Icon name="check" color={context.profile.bloodType !== '' ? 'green' : 'white'} size={24} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.listItemHalf}
              activeOpacity={1}
              onPress={() => {
                setSelect('visible')
                setData(['지역', '서울', '경기', '인천', '대전', '충북', '충남', '강원', '부산', '경북', '경남', '대구', '울산', '광주', '전북', '전남', '제주'])
                setSelectedData(context.profile.region)
              }}
            >
              <Text style={styles.labelLeft}>지역</Text>
              <Text style={styles.textLeft}>{context.profile.region}</Text>
              <Icon name="check" color={context.profile.region !== '' ? 'green' : 'white'} size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItemHalf}
              activeOpacity={1}
              onPress={() => {
                setSelect('visible')
                setData(['종교', '종교없음', '기독교', '천주교', '불교', '원불교', '유교', '이슬람교'])
                setSelectedData(context.profile.religion)
              }}
            >
              <Text style={styles.labelRight}>종교</Text>
              <Text style={styles.textRight}>{context.profile.religion}</Text>
              <Icon name="check" color={context.profile.religion !== '' ? 'green' : 'white'} size={24} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => {
              setSelect('visible')
              setData(['직업', '일반', '전문직', '의료직', '교육직', '공무원', '사업가', '금융직', '연구,기술직'])
              setSelectedData(context.profile.job)
            }}
          >
            <Text style={styles.labelLeft}>직업</Text>
            <Text style={styles.text}>{context.profile.job}</Text>
            <Icon name="check" color={context.profile.job !== '' ? 'green' : 'white'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => {
              setSelect('visible')
              setData(['체형', '마른', '슬림탄탄', '보통', '통통한', '근육질', '건장한'])
              setSelectedData(context.profile.job)
            }}
          >
            <Text style={styles.labelLeft}>체형</Text>
            <Text style={styles.text}>{context.profile.bodyShape}</Text>
            <Icon name="check" color={context.profile.bodyShape !== '' ? 'green' : 'white'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => {
              setScroll('visible')
              setSelectedData(context.profile.height)
            }}
          >
            <Text style={styles.labelLeft}>키</Text>
            <Text style={styles.text}>{context.profile.height > 0 ? `${context.profile.height}cm` : '' }</Text>
            <Icon name="check" color={context.profile.height !== 0 ? 'green' : 'white'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => {
              // setVisible('visible')
              // setData(['직업', '일반', '전문직', '의료직', '교육직', '공무원', '사업가', '금융직', '연구,기술직'])
              // setSelectedData(context.profile.job)
            }}
          >
            <Text style={styles.labelLeft}>학교</Text>
            <Text style={styles.text}>{context.profile.education}</Text>
            <Icon name="check" color={context.profile.education !== '' ? 'green' : 'white'} size={24} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SelectModal 
        visible={select === 'visible' ? true : false}
        onClose={() => setSelect('')}
        data={data}
        selectedData={selectedData}
      />
      <ScrollModal 
        visible={scroll === 'visible' ? true : false}
        onClose={() => setScroll('')}
        data={heightData}
        selectedData={selectedData}
      />
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
  image: {
    width: width * 0.6,
    aspectRatio: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    marginBottom: 32,
  },
  listItem: {
    width: width - 48,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: 10
  },
  listItemHalf: {
    width: width * 0.5 - 24,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: 10
  },
  labelLeft: {
    width: 50,
    fontSize: 18,
  },
  labelRight: {
    width: 65,
    fontSize: 18,
  },
  text: {
    width: width - 48 - 50 - 32,
    fontSize: 18,
  },
  textLeft: {
    width: width * 0.5 - 106,
    fontSize: 18,
  },
  textRight: {
    width: width * 0.5 - 121,
    fontSize: 18,
  },
})

export default MyProfile