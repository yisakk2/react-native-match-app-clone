import * as React from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import { getChattingRooms, calcTime } from '../misc/chatting'
import firestore from '@react-native-firebase/firestore'

const Chat = ({ navigation }) => {
  const context = React.useContext(FirebaseContext)
  const [rooms, setRooms] = React.useState([])
  const [profiles, setProfiles] = React.useState({})
  const [nicknames, setNicknames] = React.useState({})
  const [images, setImages] = React.useState({})

  // React.useEffect(() => {
  //   initializeRooms()
  // }, [])

  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .where('users', 'array-contains-any', [context.user.uid])
      .orderBy('lastMessagedAt', 'desc')
      .onSnapshot(snapshot => {
        let users = []
        for (let item of snapshot.docs) {
          users.push(item._data.users[0] === context.user.uid ? item._data.users[1] : item._data.users[0])
        }
        firestore().collection('users').where('id', 'in', users).get().then(querySnapshot => {
          let newProfiles = {}
          let newNicknames = {}
          let newImages = {}
          querySnapshot.forEach(async documentSnapshot => {
            newProfiles[documentSnapshot.id] = documentSnapshot.data()
            newNicknames[documentSnapshot.id] = documentSnapshot.data().nickname
            newImages[documentSnapshot.id] = await context.downloadImage(documentSnapshot.data().image)
            setImages(newImages)
          });
          setProfiles(newProfiles)
          setNicknames(newNicknames)
          console.log(profiles)
          console.log(nicknames)
        })
        setRooms(snapshot.docs)
      })

    return () => unsubscribe()
  }, [context.user.uid])

  const initializeRooms = async () => {
    let data = await getChattingRooms(context.user.uid)
    let users = []
    for (let item of data.docs) {
      users.push(item._data.users[0] === context.user.uid ? item._data.users[1] : item._data.users[0])
    }
    // firestore users profile
    firestore().collection('users').where('id', 'in', users).get().then(querySnapshot => {
      let newProfiles = {}
      let newNicknames = {}
      let newImages = {}
      querySnapshot.forEach(async documentSnapshot => {
        newProfiles[documentSnapshot.id] = documentSnapshot.data()
        newNicknames[documentSnapshot.id] = documentSnapshot.data().nickname
        newImages[documentSnapshot.id] = await context.downloadImage(documentSnapshot.data().image)
        setImages(newImages)
      });
      setProfiles(newProfiles)
      setNicknames(newNicknames)
    })

    // setRooms(data.docs)
  }

  return (
    <View style={styles.container}>
      {rooms.length > 0 ? (
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
          data={rooms}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigation.navigate('ChatRoom', { profile: profiles[item._data.users[0] === context.user.uid ? item._data.users[1] : item._data.users[0]], id: item.id })}
            >
              <Image
                style={styles.thumbnail}
                source={{uri: images[item._data.users[0] === context.user.uid ? item._data.users[1] : item._data.users[0]]}}
              />
              <View style={styles.textContainer}>
                <Text>{nicknames[item._data.users[0] === context.user.uid ? item._data.users[1] : item._data.users[0]]}</Text>
                <Text style={{color:'grey'}}>{item._data.lastMessagedText}</Text>
              </View>
              <View style={styles.optionContainer}>
                <Text style={styles.time}>{calcTime(item._data.lastMessagedAt)}</Text>
                {item._data.unreadMessages[context.user.uid] > 0 && <View style={styles.unreadMessages}><Text style={{color:'white', textAlign:'center', lineHeight: 24}}>{item._data.unreadMessages[context.user.uid]}</Text></View>}
              </View>
            </TouchableOpacity>
          )}
        />
      )
      : <ActivityIndicator size="large" color="black" />
      }
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
  itemContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  thumbnail: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgrey'
  },
  textContainer: {
    width: width - 155,
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: 'center',
  },
  optionContainer: {
    width: 65,
    paddingTop: 5,
    alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },
  time: {
    fontSize: 12,
    textAlign: 'right',
  },
  unreadMessages: {
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: 'red',
    marginTop: 4,
  }
})

export default Chat