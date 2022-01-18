import * as React from 'react'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const FirebaseContext = React.createContext();

export class FirebaseProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  signIn = (email, password) => {
    if (email === '' || password === '') return false
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ ...this.state, user })
        console.log(user)
        return true
      })
      .catch(e => {
        console.log(e)
        return false
      })
  }

  signUp = (email, password, passwordCheck) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user)
      })
      .catch(e => {
        console.log(e)
      })
    return false
  }

  signOut = () => {
    auth().signOut()
    this.setState({ ...this.state, user: null })
  }

  loadPreviousUser = async () => {
    // let user = await AsyncStorage.getItem('user')

    // if (user !== null) {
    //   this.setState({ ...this.state, user: JSON.parse(user) })
    //   console.log('loaded previous user')
    // }
    const user = auth().currentUser
    if (user) this.setState({ ...this.state, user })
  }

  componentDidMount() {
    this.loadPreviousUser()
    console.log(auth().currentUser)
  }

  render() {
    const {
      user,
    } = this.state
    return (
      <FirebaseContext.Provider value={{
        user,
        signIn: this.signIn,
        signUp: this.signUp,
        signOut: this.signOut,
      }}>
        {this.props.children}
      </FirebaseContext.Provider>
    )
  }
}

export default FirebaseProvider