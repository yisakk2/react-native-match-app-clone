import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// screens
import Home from '../screens/home'
import Date from '../screens/date'
import Match from '../screens/match'
import Choice from '../screens/choice'
import Connect from '../screens/connect'
import Location from '../screens/location'
import Setting from '../screens/setting'
import Message from '../screens/message'
// component
import DrawerModal from '../component/drawerModal'
import { Text } from 'react-native'

const Drawer = createDrawerNavigator()
const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const Tabs = () => {
  const [modalVisible, setModalVisible] = React.useState(true)

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'dimgrey',
          tabBarIndicatorStyle: {
            backgroundColor: 'red'
          }
        }}
      >
        <Tab.Screen name="소개팅" component={Date} />
        <Tab.Screen name="심쿵매치" component={Match} />
        <Tab.Screen name="초이스" component={Choice} />
        <Tab.Screen name="접속중" component={Connect} />
        <Tab.Screen name="내 근처" component={Location} />
      </Tab.Navigator>
      <DrawerModal 
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
      />
    </>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerTitleAlign: 'center', 
          headerTintColor: 'red'
        }}
      >
        <Stack.Screen 
          name="심쿵" 
          component={Tabs} 
          options={{
            headerShadowVisible: false
          }}
        />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Message" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator