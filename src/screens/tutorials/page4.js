import * as React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'

const Page4 = ({ navigation }) => {
  const context = React.useContext(FirebaseContext)
  const [text, setText] = React.useState('')
  const [available, setAvailable] = React.useState(false)

  const isAvailable = text => {
    if (text.length < 3) {
      setAvailable(false)
    } else {
      setAvailable(true)
    }
  }

  const nextPage = () => {
    const profile = context.profile
    profile.height = parseInt(text)
    context.updateState(context, { profile })
    navigation.navigate('Page5')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>키:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="170"
          onChangeText={text => {
            setText(text)
            isAvailable(text)
          }}
          keyboardType='number-pad'
          maxLength={3}
        />
        <Text style={{fontSize: 22, paddingRight: 4}}>CM</Text>
      </View>
      <Text style={{color: 'grey'}}>키는 공개됩니다.</Text>
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
    fontWeight: 'bold'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginTop: 32,
    marginBottom: 16,
  },
  inputBox: {
    width: 70,
    height: 50,
    fontSize: 24,
    // borderBottomWidth: 1,
    // marginBottom: 16,
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

export default Page4