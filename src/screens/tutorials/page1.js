import * as React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { FirebaseContext } from '../../provider/FirebaseProvider'

const Page1 = ({ navigation }) => {
  const context = React.useContext(FirebaseContext)
  const [text, setText] = React.useState('')
  const [available, setAvailable] = React.useState(false)

  const isAvailable = text => {
    if (text === '') {
      setAvailable(false)
    } else {
      setAvailable(true)
    }
  }

  const nextPage = () => {
    const profile = context.profile
    profile.nickname = text
    context.updateState(context, { profile })
    navigation.navigate('Page2')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>닉네임:</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="이름"
        onChangeText={text => {
          setText(text)
          isAvailable(text)
        }}
        autoCapitalize={'none'}
      />
      <Text style={{color: 'grey'}}>프로필에 표시되는 닉네임으로,</Text>
      <Text style={{color: 'grey'}}>이후 변경할 수 없습니다.</Text>
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
    fontSize: 32
  },
  inputBox: {
    width: width * 0.7,
    height: 50,
    fontSize: 24,
    borderBottomWidth: 1,
    marginTop: 32,
    marginBottom: 16,
  },
  submitBtn: {
    width: width * 0.8,
    height: 50,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 32,
  }
})

export default Page1