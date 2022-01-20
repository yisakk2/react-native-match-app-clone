import * as React from 'react'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { profile } from 'console';
import { thisExpression } from 'babel-types';

export const FirebaseContext = React.createContext();

export class FirebaseProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      profile: null,
      image: null,
      status: 'none',
      isloading: true,
    }
  }

  signIn = (email, password) => {
    this.setState({ ...this.state, status: 'loading' })
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        const profile = await firestore().collection('users').doc(user.user.uid).get()
        this.setState({ ...this.state, user, status: 'complete', profile: profile._data })
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
        })
        .then(() => {
          console.log('firestore complete')
        })
        .catch(e => {
          console.log('firestore failed', e)
        })
        auth().signOut()
        this.setState({ ...this.state, status: 'complete' })
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
      const profile = this.state.profile
      profile.image = name
      // this.setState({ ...this.state, profile })
      firestore().collection('users').doc(this.state.user.uid).update(profile)
      console.log('Image uploaded to the firestore!')
    }).catch(e => {
      console.log('uploaded image error => ', e)
    })
  }

  downloadImage = async name => {
    let reference = storage().ref(name)
    let image = await reference.getDownloadURL()
    this.setState({ ...this.state, image })
  }

  uploadDownloadImage = (path, name) => {
    let reference = storage().ref(name)
    let task = reference.putFile(path)

    task.then(async () => {
      let profile = this.state.profile
      profile.image = name
      // this.setState({ ...this.state, profile })
      firestore().collection('users').doc(this.state.user.uid).update(profile)
      console.log('Image uploaded to the firestore!')
      const image = await reference.getDownloadURL()
      this.setState({ ...this.state, profile, image })
    }).catch(e => {
      console.log('uploaded image error => ', e)
    })
  }

  loadUser = async () => {
    const user = auth().currentUser
    if (user !== null) {
      const profile = await firestore().collection('users').doc(user.uid).get()
      setTimeout(() => {
        this.setState({ ...this.state, user, profile: profile._data, isloading: false })
      }, 2000)
    } else {
      setTimeout(() => {
        this.setState({ ...this.state, user, isloading: false })
      }, 2000)
    }
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState })
  }

  updateFirestore = data => {
    firestore().collection('users').doc(this.state.user.uid).update(data)
  }

  componentDidMount() {
    this.loadUser()
  }

  render() {
    const {
      user,
      profile,
      image,
      status,
      isloading,
    } = this.state
    return (
      <FirebaseContext.Provider value={{
        user,
        profile,
        image,
        status,
        isloading,
        signIn: this.signIn,
        signUp: this.signUp,
        signOut: this.signOut,
        uploadImage: this.uploadImage,
        downloadImage: this.downloadImage,
        uploadDownloadImage: this.uploadDownloadImage,
        updateState: this.updateState,
        updateFirestore: this.updateFirestore,
      }}>
        {this.props.children}
      </FirebaseContext.Provider>
    )
  }
}

export default FirebaseProvider