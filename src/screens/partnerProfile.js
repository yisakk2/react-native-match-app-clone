import * as React from 'react'
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import { calcAgeGroup } from '../misc/helper'
import Icon from 'react-native-vector-icons/FontAwesome'

const PartnerProfile = ({ route }) => {
  const context = React.useContext(FirebaseContext)
  const { profile, id } = route.params
  const [image, setImage] = React.useState(null)

  React.useEffect(() => {
    imageDownload()
  }, [])

  const imageDownload = async () => {
    const url = await context.downloadImage(profile.image)
    setImage(url)
  }

  const handleHeart = () => {
    Alert.alert(
      "좋아요를 보낼까요?",
      "상대방이 좋아요를 수락하면 채팅을 시작할 수 있습니다. 하트 5개를 사용합니다.",
      [
        {text:"취소"},
        {text:"좋아요 보내기", onPress: () => sendHeart()}
      ]
    )
  }

  const sendHeart = () => {
    
  }
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: image}}
            />
          </View>
          <Text style={styles.titleItem}>저는요</Text>
          <Text style={styles.listItem}>{calcAgeGroup(profile.age)}이고 {profile.region}에서 살고있어요.</Text>
          <Text style={styles.titleItem}>직업</Text>
          <Text style={styles.listItem}>{profile.job}입니다.</Text>
          <Text style={styles.titleItem}>체형</Text>
          <Text style={styles.listItem}>{profile.bodyShape} 입니다.</Text>
          <Text style={styles.titleItem}>키</Text>
          <Text style={styles.listItem}>키는 {profile.height}cm 입니다.</Text>
          <Text style={styles.titleItem}>종교</Text>
          <Text style={styles.listItem}>종교는 {profile.religion} 입니다.</Text>
          <Text style={styles.titleItem}>혈액형</Text>
          <Text style={styles.listItem}>혈액형은 {profile.bloodType} 입니다.</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightcoral'}}
        onPress={handleHeart}
      >
        <Icon name="heart" color={'white'} size={18} />
        <Text style={{fontSize: 18, color: 'white'}}>  좋아요 보내기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    padding: 20,
    backgroundColor: 'white'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  titleItem: {
    paddingHorizontal: 20,
    lineHeight: 45,
    color: 'red',
    fontSize: 18,
  },
  listItem: {
    padding: 20,
    backgroundColor: 'white'
  }
})

export default PartnerProfile