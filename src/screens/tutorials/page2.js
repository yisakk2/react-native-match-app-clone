import * as React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'

const Page2 = ({ navigation }) => {
  const context = React.useContext(FirebaseContext)
  const [text, setText] = React.useState('')
  const [available, setAvailable] = React.useState(false)

  const isAvailable = text => {
    if (text.length < 2) {
      setAvailable(false)
    } else {
      setAvailable(true)
    }
  }

  const nextPage = () => {
    const profile = context.profile
    profile.age = parseInt(text)
    context.updateState(context, { profile })
    navigation.navigate('Page3')
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>나이:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="24"
          onChangeText={text => {
            setText(text)
            isAvailable(text)
          }}
          autoCapitalize={'none'}
          keyboardType='number-pad'
          maxLength={2}
        />
      </View>
      <Text style={{color: 'grey'}}>나이는 공개됩니다.</Text>
      <TouchableOpacity
        style={[styles.submitBtn, {backgroundColor: available ? 'lightcoral' : 'whitesmoke'}]}
        disabled={!available}
        onPress={nextPage}
      >
        <Text style={{fontSize: 18, textAlign: 'center', color: available ? 'white' : 'grey'}}>계속</Text>
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    width: width,
    height: 50,
    marginTop: 32,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: 100,
    height: 50,
    fontSize: 24,
    textAlign: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 4,
  },
  submitBtn: {
    width: width * 0.8,
    height: 50,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 48,
  }
})

export default Page2