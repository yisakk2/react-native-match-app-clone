import * as React from 'react'
import { StyleSheet, View, ActivityIndicator} from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import firestore from '@react-native-firebase/firestore'

const Page6 = () => {
  const context = React.useContext(FirebaseContext)
  
  setTimeout(async () => {
    let profile = context.profile
    profile.tutorial = true
    firestore().collection('users').doc(context.user.uid).update(profile)
    const image = await context.downloadImage(profile.image)
    context.updateState(context, { profile, image })
  }, 2000)

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})

export default Page6