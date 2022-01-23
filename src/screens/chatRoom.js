import * as React from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, Text, TextInput, Dimensions } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import firestore from '@react-native-firebase/firestore'
import { messageTime, messageDate } from '../misc/chatting'
import { MyMessage, PartnerMessage } from '../component/messages'

const ChatRoom = ({ route }) => {
  const context = React.useContext(FirebaseContext)
  const { profile, id } = route.params
  const [text, setText] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const [room, setRoom] = React.useState({})

  React.useEffect(() => {
    const unsubscribe = firestore().collection('chats').doc(id).collection('messages').orderBy('createdAt', 'asc').onSnapshot(snapshot => {
      let newMessages = []
      let showDate = []
      snapshot.forEach(doc => {
        let flag = false
        let date = doc.data().createdAt.toDate().toDateString()
        if (!showDate.includes(date)) {
          showDate.push(date)
          flag = true
        }
        if (doc.data().sender !== context.user.uid) {
          newMessages.push({ ...doc.data(), chekced: true, id: doc.id, showDate: flag })
          firestore().collection('chats').doc(id).collection('messages').doc(doc.id).set({
            checked: true
          }, {merge: true})
        } else newMessages.push({ ...doc.data(), id: doc.id, showDate: flag })
      })
      setMessages(newMessages)
    })
    return () => unsubscribe()
  }, [id])

  React.useEffect(() => {
    const roomData = firestore().collection('chats').doc(id).onSnapshot(snapshot => {
      let newUnreadMessages = snapshot.data().unreadMessages
      newUnreadMessages[context.user.uid] = 0
      firestore().collection('chats').doc(id).set({
        unreadMessages: newUnreadMessages
      }, {merge: true})
      setRoom({ ...snapshot.data(), unreadMessages: newUnreadMessages })
    })
    return () => roomData()
  }, [id])

  const sendMessage = () => {
    if (text !== '') {
      const now = new Date()
      firestore().collection('chats').doc(id).collection('messages').add({
        checked: false,
        createdAt: now,
        message: text,
        sender: context.user.uid
      })
      let partnerId = room.users[0] === context.user.uid ? room.users[1] : room.users[0]
      let newUnreadMessages = room.unreadMessages
      newUnreadMessages[partnerId]++
      firestore().collection('chats').doc(id).set({
        lastMessagedAt: now,
        lastMessagedText: text,
        unreadMessages: newUnreadMessages
      }, {merge: true})
    }
    setText('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {messages && messages.map(item => (
          <View key={item.id}>
            {item.showDate && (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10}}>
                <View style={{width: width * 0.3, height:1, backgroundColor: 'grey'}}></View>
                <Text style={styles.dateField}>{messageDate(item.createdAt)}</Text>
                <View style={{width: width * 0.3, height:1, backgroundColor: 'grey'}}></View>
              </View>
            )}
            {item.sender === context.user.uid ? (
              <MyMessage
                message={item.message}
                time={messageTime(item.createdAt)}
                checked={item.checked}
              />
            ) : (
              <PartnerMessage
                message={item.message}
                time={messageTime(item.createdAt)}
                checked={item.checked}
              />
            )}
            {/* <View style={[styles.listItem, {justifyContent: item.sender === context.user.uid ? 'flex-end' : 'flex-start'}]}>
              <View>
                <Text style={{fontSize: 12, color: 'lightcoral', textAlign: 'right'}}>{item.checked === false ? 1 : ''}</Text>
                <Text style={{fontSize: 12}}>{messageTime(item.createdAt)}</Text>
              </View>
              <View style={styles.myMessageContainer}>
                <Text>{item.message}</Text>
              </View>
            </View> */}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputBox}
          onChangeText={text => setText(text)}
          onSubmitEditing={sendMessage}
        />
      </View>
    </SafeAreaView>
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
  inputContainer: {
    width: width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey'
  },
  inputBox: {
    width: width - 30,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15, 
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  dateField: {
    // paddingHorizontal: 20,
    // borderRadius: 20,
    // color: 'white',
    // backgroundColor: 'grey'
  },
  listItem: {
    width: width,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    padding: 10,
    marginLeft: 5,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'lightcoral'
  }
})

export default ChatRoom