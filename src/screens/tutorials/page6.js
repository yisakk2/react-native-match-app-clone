import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'
import firestore from '@react-native-firebase/firestore'

const Page6 = () => {
  const context = React.useContext(FirebaseContext)

  React.useEffect(() => {
    // let profile = context.profile
    // profile.tutorial = true
    // firestore().collection('users').doc(context.user.uid).update(profile).then(async () => {
    //   const image = await context.downloadImage(profile.image)
    //   context.updateState(context, { profile, image })
    // })
    initialize()
  }, [])

  const initialize = async () => {
    let profile = context.profile
    profile.tutorial = true
    await firestore().collection('users').doc(context.user.uid).update(profile)
    const image = await context.downloadImage(profile.image)
    context.updateState(context, { profile, image })
  }

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color="black" /> */}
      <Text>프로필 세팅을 완료하셨습니다.</Text>
      <Text>환영합니다!</Text>
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