import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// screens
import Date from '../screens/date'
import Match from '../screens/match'
import Choice from '../screens/choice'
import Connect from '../screens/connect'
import Location from '../screens/location'
import Setting from '../screens/setting'
import Charge from '../screens/charge'
import Message from '../screens/message'
import Card from '../screens/card'
// component
import DrawerModal from '../component/drawerModal'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

Icon.loadFont()

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const Tabs = () => {
  return (
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
  )
}

const AppNavigator = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const navigation = useNavigation(); 

  return (
    <>
      <Stack.Navigator 
        screenOptions={{
          headerTitleAlign: 'center', 
          headerTintColor: 'red',
        }}
      >
        <Stack.Screen 
          name="Tabs" 
          component={Tabs} 
          options={{
            headerTitle: '심쿵',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setModalVisible(true)}
                visible={false}
              >
                <Icon name="menu" size={24} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigation.navigate('Charge')}
                  visible={false}
                >
                  <Icon name="gift" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigation.navigate('Message')}
                  visible={false}
                >
                  <Icon name="message-square" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigation.navigate('Card')}
                  visible={false}
                >
                  <Icon name="heart" size={24} />
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <Stack.Screen name="Setting" component={Setting} options={{headerTitle: '설정'}} />
        <Stack.Screen name="Charge" component={Charge} options={{headerTitle: '하트충전'}} />
        <Stack.Screen name="Message" component={Message} options={{headerTitle: '대화'}} />
        <Stack.Screen name="Card" component={Card} options={{headerTitle: '카드리스트'}} />
      </Stack.Navigator>
      <DrawerModal 
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
        charge={() => navigation.navigate('Charge')}
        unlimited={() => {}}
        block={() => {}}
        attract={() => {}}
        setting={() => {
          setModalVisible(false)
          navigation.navigate('Setting')
        }}
        notification={() => {}}
        ask={() => {}}
      />
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  }
})

export default AppNavigator