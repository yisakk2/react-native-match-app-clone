import * as React from 'react'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { profile } from 'console';

export const FirebaseContext = React.createContext();

export class FirebaseProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      profile: null,
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
      profile.image = 'gs://react-native-match-app.appspot.com/' & name
      this.setState({ ...this.state, profile })
      firestore().collection('users').doc(this.state.user.uid).update(profile)
      console.log('Image uploaded to the firestore!')
    }).catch(e => console.log('uploaded image error => ', e))
  }

  loadUser = async () => {
    const user = auth().currentUser
    if (user !== null) {
      const profile = await firestore().collection('users').doc(user.uid).get()
      setInterval(() => {
        this.setState({ ...this.state, user, profile: profile._data, isloading: false })
      }, 3000)
    }
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState })
  }

  componentDidMount() {
    this.loadUser()
  }

  render() {
    const {
      user,
      profile,
      status,
      isloading,
    } = this.state
    return (
      <FirebaseContext.Provider value={{
        user,
        profile,
        status,
        isloading,
        signIn: this.signIn,
        signUp: this.signUp,
        signOut: this.signOut,
        uploadImage: this.uploadImage,
        updateState: this.updateState,
      }}>
        {this.props.children}
      </FirebaseContext.Provider>
    )
  }
}

export default FirebaseProvider