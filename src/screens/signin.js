import * as React from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import Loading from '../component/loading'

const SignIn = ({ navigation }) => {
  const context = React.useContext(FirebaseContext);
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSignIn = () => {
    if (email === '' || password === '') {
      Alert.alert(
        "로그인 실패",
        "아이디나 패스워드를 다시 확인해주세요."
      )
    }
    context.signIn(email, password)
  }

  React.useEffect(() => {
    if (context.status === 'signinerror') {
      Alert.alert(
        "로그인 실패",
        "아이디나 패스워드를 다시 확인해주세요."
      )
      context.updateState(context, {status: 'complete'})
    }
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder="email"
        onChangeText={text => setEmail(text)}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="password"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        autoCapitalize={'none'}
      />
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => handleSignIn()}
      >
        <Text style={{textAlign: 'center', color: 'white'}}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.extraContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textbtn}>회원가입</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('FindId')}>
            <Text style={styles.textbtn}>아이디 찾기</Text>
          </TouchableOpacity>
          <View style={{width:1, margin: 5, backgroundColor: 'lightcoral'}}></View>
          <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
            <Text style={styles.textbtn}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loading visible={context.status === 'loading' ? true : false} />
    </View>
  );
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  inputBox: {
    width: width - 32,
    height: 50,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'lightcoral',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  submitBtn: {
    width: width - 32,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'lightcoral',
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 6,
  },
  extraContainer: {
    flexDirection: 'row', 
    alignItems: 'stretch', 
    justifyContent: 'space-between',
    marginHorizontal: 16,
  }, 
  textbtn: {
    padding: 4, 
    color: 'lightcoral'
  }
})

export default SignIn