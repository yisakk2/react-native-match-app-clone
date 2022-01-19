import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// screens
import Page1 from '../screens/tutorials/page1'
import Page2 from '../screens/tutorials/page2'
import Page3 from '../screens/tutorials/page3'
import Page4 from '../screens/tutorials/page4'
import Page5 from '../screens/tutorials/page5'

const Stack = createStackNavigator()

const TutorialNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerTintColor: 'red',
        // headerTitleAlign: 'center', 
        // headerTitle: '프로필 설정'
      }}
    >
      <Stack.Screen name="Page1" component={Page1} />
      <Stack.Screen name="Page2" component={Page2} />
      <Stack.Screen name="Page3" component={Page3} />
      <Stack.Screen name="Page4" component={Page4} />
      <Stack.Screen name="Page5" component={Page5} />
    </Stack.Navigator>
  )
}

export default TutorialNavigator