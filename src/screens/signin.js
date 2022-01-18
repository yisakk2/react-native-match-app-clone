import * as React from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'

const SignIn = () => {
  const context = React.useContext(FirebaseContext);
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSignIn = async () => {
    let flag = await context.signIn(email, password)
    if (flag) {
      Alert.alert(
        "로그인 실패",
        "아이디나 패스워드를 다시 확인해주세요."
      )
    }
  }

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
          <TouchableOpacity>
            <Text style={styles.textbtn}>회원가입</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Text style={styles.textbtn}>아이디 찾기</Text>
            </TouchableOpacity>
            <View style={{width:1, margin: 5, backgroundColor: 'lightcoral'}}></View>
            <TouchableOpacity>
              <Text style={styles.textbtn}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  submitBtn: {
    width: width - 32,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'lightcoral',
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
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