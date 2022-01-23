import firestore from '@react-native-firebase/firestore'

export const getChattingRooms = async (id) => {
  const rooms = await firestore().collection('chats').where('users', 'array-contains-any', [id]).orderBy('lastMessagedAt', 'desc').get()
  return rooms
}

export const countUnreadMessages = async (docId, userId) => {
  const messages = await firestore().collection('chats').doc(docId).collection('messages').where('checked', '==', false).where('sender', '!=', userId).get()
  return messages.docs.length
}

export const calcTime = lastMessagedAt => {
  const now = new Date()
  const time = lastMessagedAt.toDate()
  const difference = now - time
  if (difference < (1000 * 3600 * 24)) {
    let hh = time.getHours()
    let mm = time.getMinutes()
    let ampm = "오전"
    if (hh > 11) {
      hh -= 12
      ampm = "오후"
    }
    if (hh === 0) hh = 12
    if (mm < 10) return `${ampm} ${hh}:0${mm}`
    return `${ampm} ${hh}:${mm}`
  } else {
    if (difference < (2000 * 3600 * 24)) {
      return "어제"
    } else {
      return time.toLocaleDateString()
    }
  }
}

export const messageTime = createdAt => {
  const time = createdAt.toDate()
  let hh = time.getHours()
  let mm = time.getMinutes()
  let ampm = "오전"
  if (hh > 11) {
    hh -= 12
    ampm = "오후"
  }
  if (hh === 0) hh = 12
  if (mm < 10) return `${ampm} ${hh}:0${mm}`
  return `${ampm} ${hh}:${mm}`
}

export const messageDate = createdAt => {
  const date = createdAt.toDate()
  let yyyy = date.getFullYear()
  let mm = date.getMonth() + 1
  let dd = date.getDate()

  return `${yyyy}년 ${mm}월 ${dd}일`
}