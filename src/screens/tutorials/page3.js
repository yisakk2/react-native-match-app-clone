import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'

const Page3 = ({ navigation }) => {
  const context = React.useContext(FirebaseContext)
  const [text, setText] = React.useState('')

  const nextPage = () => {
    const profile = context.profile
    profile.sex = text
    context.updateState(context, { profile })
    navigation.navigate('Page4')
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>성별:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.selectBtn, {borderColor: text === 'female' ? 'lightcoral' : 'lightgrey'}]}
          onPress={() => setText('female')}
        >
          <Text style={{fontSize: 18, textAlign: 'center', color: text === 'female' ? 'lightcoral' : 'grey'}}>여성</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectBtn, {borderColor: text === 'male' ? 'lightcoral' : 'lightgrey'}]}
          onPress={() => setText('male')}
        >
        <Text style={{fontSize: 18, textAlign: 'center', color: text === 'male' ? 'lightcoral' : 'grey'}}>남성</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.submitBtn, {backgroundColor: text ? 'lightcoral' : 'whitesmoke'}]}
        disabled={!text}
        onPress={nextPage}
      >
        <Text style={{fontSize: 18, textAlign: 'center', color: text ? 'white' : 'grey'}}>계속</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  buttonContainer: {
    width: width,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtn: {
    width: width * 0.8,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: 'center',
    marginVertical: 8,
  },
  submitBtn: {
    width: width * 0.8,
    height: 50,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 32
  }
})

export default Page3