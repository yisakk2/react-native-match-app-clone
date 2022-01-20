import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Image } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import Icon from 'react-native-vector-icons/Feather'

Icon.loadFont()

const Date = ({ navigation }) => {
  const context = React.useContext(FirebaseContext)

  React.useEffect(() => {
    if (context.todaysCard.length === 0) context.loadtodaysCard()
    else setupImages()
  }, [context.todaysCard])

  const setupImages = async () => {
    const data = context.todaysCard
    let index = 0
    for (let item of data) {
      const images = []
      const firstUrl = await context.downloadImage(item._data.firstPick.image)
      const secondUrl = await context.downloadImage(item._data.secondPick.image)
      images.push(firstUrl)
      images.push(secondUrl)
      data[index] = {...item, images}
      index++
    }
    context.updateState(context, { todaysCard: data })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center', padding: 12}}>
          <TouchableOpacity style={styles.event} onPress={() => navigation.navigate('Unlimited')}>
            <Text style={{fontSize:20, lineHeight:30, color:'white'}}>좋아요 무제한권</Text>
            <Text style={{fontSize:20, lineHeight:30, color:'white'}}>이벤트중</Text>
          </TouchableOpacity>
          {context.todaysCard.length > 0 ? (
            context.todaysCard.map(item => (
              <View key={item._data.createdAt.toString()}>
                <View style={styles.titleCard}>
                  <Text style={styles.titleCardText}>오늘의 카드</Text>
                  <Text style={styles.titleCardText}>오늘 카드 남은 시간 19:24</Text>
                </View>
                <TouchableOpacity style={styles.cardContainer}>
                  {item.images !== undefined ? 
                    <Image
                      style={styles.cardLeft}
                      source={{uri: item.images[0]}}
                    />
                    : 
                    <View style={styles.cardLeft}></View>
                  }
                  <View style={styles.cardRight}>
                    <Text style={{color:'red'}}>{item._data.firstPick.nickname}</Text>
                    <Text style={{fontSize:12,color:'red'}}>(경기, 20대 중반)</Text>
                    <View style={{height:10}}></View>
                    <Text style={{fontSize:12}}>일반, 학생</Text>
                    <Text style={{fontSize:12}}>보통체형, B형</Text>
                    {item._data.picked === 'first' && 
                      <View style={styles.lockIcon}>
                        <Icon name="lock" color={'white'} size={24} />
                      </View>
                    }
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardContainer}>
                  {item.images ? 
                    <Image
                      style={styles.cardLeft}
                      source={{uri: item.images[1]}}
                    />
                    : 
                    <View style={styles.cardLeft}></View>
                  }
                  <View style={styles.cardRight}>
                    <Text style={{color:'red'}}>{item._data.secondPick.nickname}</Text>
                    <Text style={{fontSize:12,color:'red'}}>(경기, 20대 중반)</Text>
                    <View style={{height:10}}></View>
                    <Text style={{fontSize:12}}>일반, 학생</Text>
                    <Text style={{fontSize:12}}>보통체형, B형</Text>
                    {item._data.picked === 'second' && 
                      <View style={styles.lockIcon}>
                        <Icon name="lock" color={'white'} size={24} />
                      </View>
                    }
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ):(
            // 로딩 컴포넌트
            <View style={{height: 200, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="black" />
            </View>
          )
          }
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
    backgroundColor: 'lightgrey'
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