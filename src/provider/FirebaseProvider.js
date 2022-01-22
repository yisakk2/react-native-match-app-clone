import * as React from 'react'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

export const FirebaseContext = React.createContext();
export class FirebaseProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      profile: null,
      image: null,
      todaysCard: [],
      status: 'none',
      isloading: true,
    }
  }

  signIn = (email, password) => {
    this.setState({ ...this.state, status: 'loading' })
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        let image = null
        const profile = await firestore().collection('users').doc(user.user.uid).get()
        // const image = await this.downloadImage(profile._data.image)
        if (profile._data.tutorial) image = await this.downloadImage(profile._data.image)
        this.setState({ ...this.state, user, profile: profile._data, image, status: 'complete'})
      })
      .catch(e => {
        console.log(e)
        this.setState({ ...this.state, status: 'signinerror' })
      })
  }

  signUp = (email, password, phone) => {
    this.setState({ ...this.state, status: 'loading' })
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firestore().collection('users').doc(user.user.uid).set({
          nickname: '',
          phone: phone,
          age: 0,
          region: '',
          job: '',
          bodyShape: '',
          height: 0,
          education: '',
          bloodType: '',
          religion: '',
          image: '',
          sex: 'male',
          tutorial: false,
          heart: 15,
        })
        .then(() => {
          console.log('firestore complete')
          auth().signOut()
          this.setState({ ...this.state, status: 'complete' })
        })
        .catch(e => {
          console.log('firestore failed', e)
          this.setState({ ...this.state, status: 'signuperror' })
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({ ...this.state, status: 'signuperror' })
      })
  }

  signOut = () => {
    auth().signOut()
    this.setState({ ...this.state, user: null })
  }

  uploadImage = (path, name) => {
    let reference = storage().ref(name)
    let task = reference.putFile(path)

    task.then(() => {
      let profile = this.state.profile
      profile.image = name
      this.setState({ ...this.state, profile })
      // firestore().collection('users').doc(this.state.user.uid).update(profile)
      console.log('Image uploaded to the storage!')
    }).catch(e => {
      console.log('uploaded image error => ', e)
    })
  }

  downloadImage = async name => {
    if (name === '') return null
    const reference = storage().ref(name)
    const image = await reference.getDownloadURL()
    return image
  }

  uploadDownloadImage = (path, name) => {
    let reference = storage().ref(name)
    let task = reference.putFile(path)

    task.then(async () => {
      let profile = this.state.profile
      profile.image = name
      firestore().collection('users').doc(this.state.user.uid).update(profile)
      const image = await reference.getDownloadURL()
      this.setState({ ...this.state, profile, image })
      console.log('Image uploaded to the firestore and downloaded the image!')
    }).catch(e => {
      console.log('uploaded image error => ', e)
    })
  }

  pickCard = (todaysCard, index) => {
    const card = {
      createdAt: new Date(),
      sender: this.state.user.uid,
      receiver: todaysCard._data.users[index],
      senderOpened: true,
      receiverOpened: false,
      available: true,
    }
    firestore().collection('users').doc(this.state.user.uid).collection('todaysCard').doc(todaysCard.id).update(todaysCard._data).then(() => console.log('haha'))
    firestore().collection('cards').add(card).then(() => console.log('Card uploaded to the firestore!'))
  }
  
  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState })
  }

  updateFirestore = data => {
    firestore().collection('users').doc(this.state.user.uid).update(data)
  }

  loadUser = async () => {
    const user = auth().currentUser
    if (user !== null) {
      const profile = await firestore().collection('users').doc(user.uid).get()
      const image = await this.downloadImage(profile._data.image)
      setTimeout(() => {
        this.setState({ ...this.state, user, profile: profile._data, image, isloading: false })
      }, 2000)
    } else {
      setTimeout(() => {
        this.setState({ ...this.state, user, isloading: false })
      }, 2000)
    }
  }

  loadtodaysCard = async () => {
    let todaysCard = await firestore().collection('users').doc(this.state.user.uid).collection('todaysCard').orderBy('createdAt', 'desc').get()
    if (todaysCard.docs.length > 0) {
      let index = 0
      for (let item of todaysCard.docs) {
        let images = []
        let profiles = []
        const firstProfile = await firestore().collection('users').doc(item._data.users[0]).get()
        const secondProfile = await firestore().collection('users').doc(item._data.users[1]).get()
        const firstUrl = await this.downloadImage(firstProfile._data.image)
        const secondUrl = await this.downloadImage(secondProfile._data.image)
        images.push(firstUrl)
        images.push(secondUrl)
        profiles.push(firstProfile._data)
        profiles.push(secondProfile._data)
        todaysCard.docs[index] = {...item, images, profiles, id: item.id}
        index++
      }
      this.setState({ ...this.state, todaysCard: todaysCard.docs})
    } else {
      let users = await firestore().collection('users').where('sex', '!=', this.state.profile.sex).get()
      users.docs.sort(() => Math.random() - 0.5)
      const data = {
        users: [users.docs[0].id, users.docs[1].id],
        createdAt: new Date(),
        picked: 'none',
      }
      firestore().collection('users').doc(this.state.user.uid).collection('todaysCard').add(data).then(() => {
        this.loadtodaysCard()
      })
    }
  }

  initialize = async () => {
    const user = auth().currentUser
    if (user !== null) {
      const profile = await firestore().collection('users').doc(user.uid).get()
      const image = await this.downloadImage(profile._data.image)
      setTimeout(() => {
        this.setState({ ...this.state, user, profile: profile._data, image, isloading: false })
      }, 2000)
    } else {
      setTimeout(() => {
        this.setState({ ...this.state, isloading: false })
      }, 2000)
    }
  }

  componentDidMount() {
    this.initialize()
  }

  render() {
    const {
      user,
      profile,
      image,
      todaysCard,
      status,
      isloading,
    } = this.state
    return (
      <FirebaseContext.Provider value={{
        user,
        profile,
        image,
        todaysCard,
        status,
        isloading,
        signIn: this.signIn,
        signUp: this.signUp,
        signOut: this.signOut,
        uploadImage: this.uploadImage,
        downloadImage: this.downloadImage,
        uploadDownloadImage: this.uploadDownloadImage,
        pickCard: this.pickCard,
        updateState: this.updateState,
        updateFirestore: this.updateFirestore,
        loadtodaysCard: this.loadtodaysCard,
      }}>
        {this.props.children}
      </FirebaseContext.Provider>
    )
  }
}

export default FirebaseProvider