import * as React from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const FirebaseContext = React.createContext();

export class FirebaseProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      profile: null,
      status: 'none',
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

  loadUser = async () => {
    const user = auth().currentUser
    const profile = await firestore().collection('users').doc(user.uid).get()
    if (user !== null) {
      this.setState({ ...this.state, user, profile: profile._data })
      console.log(profile._data)
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
    } = this.state
    return (
      <FirebaseContext.Provider value={{
        user,
        profile,
        status,
        signIn: this.signIn,
        signUp: this.signUp,
        signOut: this.signOut,
        updateState: this.updateState,
      }}>
        {this.props.children}
      </FirebaseContext.Provider>
    )
  }
}

export default FirebaseProvider