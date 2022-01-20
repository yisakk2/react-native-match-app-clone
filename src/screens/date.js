import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import Icon from 'react-native-vector-icons/Feather'

Icon.loadFont()

const Date = ({ navigation }) => {
  const context = React.useContext(FirebaseContext)

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center', padding: 12}}>
          <TouchableOpacity style={styles.event} onPress={() => navigation.navigate('Unlimited')}>
            <Text style={{fontSize:20, lineHeight:30, color:'white'}}>좋아요 무제한권</Text>
            <Text style={{fontSize:20, lineHeight:30, color:'white'}}>이벤트중</Text>
          </TouchableOpacity>
          <View style={styles.titleCard}>
            <Text style={styles.titleCardText}>오늘의 카드</Text>
            <Text style={styles.titleCardText}>오늘 카드 남은 시간 19:24</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.cardLeft}></View>
            <View style={styles.cardRight}>
              <Text style={{color:'red'}}>딜랑</Text>
              <Text style={{fontSize:12,color:'red'}}>(경기, 20대 중반)</Text>
              <View style={{height:10}}></View>
              <Text style={{fontSize:12}}>일반, 학생</Text>
              <Text style={{fontSize:12}}>보통체형, B형</Text>
              <View style={styles.lockIcon}>
                <Icon name="lock" color={'white'} size={24} />
              </View>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.cardLeft}></View>
            <View style={styles.cardRight}>
              <Text style={{color:'red'}}>딜랑</Text>
              <Text style={{fontSize:12,color:'red'}}>(경기, 20대 중반)</Text>
              <View style={{height:10}}></View>
              <Text style={{fontSize:12}}>일반, 학생</Text>
              <Text style={{fontSize:12}}>보통체형, B형</Text>
              <View style={styles.lockIcon}>
                <Icon name="lock" color={'white'} size={24} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  event: {
    width: width - 24,
    height: 200,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'goldenrod'
  },
  titleCard: {
    width: width - 24,
    padding: 6,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'darkgrey'
  },
  titleCardText: {
    fontSize: 16,
    color: 'white'
  },
  cardContainer: {
    position: 'relative',
    width: width - 24,
    flexDirection: 'row',
    borderColor: 'lightgrey',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 12
  },
  cardLeft: {
    width: '48%',
    // aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'black'
  },
  cardRight: {
    width: '52%',
    aspectRatio: 1,
    justifyContent: 'center',
    padding: 20
  },
  lockIcon: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'dimgrey',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Date