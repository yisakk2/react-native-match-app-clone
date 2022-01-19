import * as React from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, TextInput, TouchableOpacity, Alert} from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'
import Loading from '../component/loading'

const SignUp = ({ navigation }) => {
  const context = React.useContext(FirebaseContext);
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordCheck, setPasswordCheck] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [isIdentical, setIsIdentical] = React.useState(true)

  const handleSignUp = () => {
    if (email === '' || password === '' || passwordCheck === '' || phone === '') {
      Alert.alert(
        "회원가입 실패",
        "빈칸을 채워주세요."
      )
    }
    if (!isIdentical) {
      Alert.alert(
        "회원가입 실패",
        "비밀번호가 일치하지 않습니다."
      )
    }
    context.signUp(email, password, phone)
  }

  React.useEffect(() => {
    if (context.status === 'signuperror') {
      Alert.alert(
        "회원가입 실패",
        "회원가입을 실패하셨습니다. 다시 시도해주세요."
      )
      context.updateState(context, {status: 'none'})
    } else if (context.status === 'complete') {
      Alert.alert(
        "회원가입 성공",
        "회원가입을 완료하셨습니다.",
        [
          {
            onPress: () => navigation.pop()
          }
        ]
      )
      context.updateState(context, {status: 'none'})
    }
  })

  const compare = text => {
    if (password === text || text === '') {
      setIsIdentical(true)
    } else {
      setIsIdentical(false)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{padding: 16}}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이메일</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="이메일을 입력하세요"
            onChangeText={text => setEmail(text)}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>비밀번호</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="패스워드를 입력하세요"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>비밀번호 확인</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="패스워드를 재입력하세요"
            onChangeText={text => {
              setPasswordCheck(text)
              compare(text)
            }}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
          {!isIdentical && <Text style={[styles.inputLabel, {color: 'red'}]}>패스워드가 일치하지 않습니다.</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>핸드폰</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="핸드폰번호를 입력하세요"
            keyboardType='number-pad'
            onChangeText={text => setPhone(text)}
            autoCapitalize={'none'}
            maxLength={11}
          />
        </View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSignUp}
        >
          <Text style={{color: 'white', textAlign: 'center'}}>회원가입</Text>
        </TouchableOpacity>
      </ScrollView>
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
  inputContainer: {
    // width: width - 32,
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 4,
  },
  inputLabel: {
    // fontSize: 15,
    lineHeight: 28,
    paddingLeft: 8,
    color: 'lightcoral',
  },
  inputBox: {
    width: width - 32,
    height: 50,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'lightcoral',
    padding: 12,
  },
  submitBtn: {
    width: width - 32,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'lightcoral',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
})

export default SignUp