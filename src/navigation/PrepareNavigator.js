import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// screens
import SignIn from '../screens/signin'
import SignUp from '../screens/signup'
import FindId from '../screens/findId'
import FindPassword from '../screens/findPassword'

const Stack = createStackNavigator()

const PrepareNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', 
        headerTintColor: 'red',
      }}
    >
      <Stack.Screen 
        name="SignIn" 
        component={SignIn} 
        options={{
          headerTitle: '로그인',
        }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{
          headerTitle: '회원가입',
        }}
      />
      <Stack.Screen 
        name="FindId" 
        component={FindId} 
        options={{
          headerTitle: '아이디 찾기',
        }}
      />
      <Stack.Screen 
        name="FindPassword" 
        component={FindPassword} 
        options={{
          headerTitle: '비밀번호 찾기',
        }}
      />
    </Stack.Navigator>
  )
}

export default PrepareNavigator