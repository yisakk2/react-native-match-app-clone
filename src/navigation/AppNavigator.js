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
import Charge from '../screens/charge'
import Message from '../screens/message'
import Card from '../screens/card'
import MyProfile from '../screens/myProfile'
import Unlimited from '../screens/unlimited'
import Block from '../screens/block'
import Attract from '../screens/attract'
import Setting from '../screens/setting'
import Notification from '../screens/notification'
import Ask from '../screens/ask'
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
  const [modalVisible, setModalVisible] = React.useState('')
  const navigation = useNavigation(); 

  React.useEffect(() => {
    switch (modalVisible) {
      case 'profile':
        return navigation.navigate('MyProfile')
      case 'charge':
        return navigation.navigate('Charge')
      case 'unlimited':
        return navigation.navigate('Unlimited')
      case 'block':
        return navigation.navigate('Block')
      case 'attract':
        return navigation.navigate('Attract')
      case 'setting':
        return navigation.navigate('Setting')
      case 'notification':
        return navigation.navigate('Notification')
      case 'ask':
        return navigation.navigate('Ask')
    }
  }, [modalVisible])

  return (
    <>
      <Stack.Navigator 
        screenOptions={{
          headerTitleAlign: 'center', 
          headerTintColor: 'red', 
          headerShadowVisible: false
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
                onPress={() => setModalVisible('visible')}
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
        <Stack.Screen name="Message" component={Message} options={{headerTitle: '대화'}} />
        <Stack.Screen name="Card" component={Card} options={{headerTitle: '카드리스트'}} />
        <Stack.Screen name="MyProfile" component={MyProfile} options={{headerTitle: '내 프로필'}} />
        <Stack.Screen name="Charge" component={Charge} options={{headerTitle: '하트충전'}} />
        <Stack.Screen name="Unlimited" component={Unlimited} options={{headerTitle: '좋아요 무제한권'}} />
        <Stack.Screen name="Block" component={Block} options={{headerTitle: '지인차단'}} />
        <Stack.Screen name="Attract" component={Attract} options={{headerTitle: '내 매력도 보기'}} />
        <Stack.Screen name="Setting" component={Setting} options={{headerTitle: '설정'}} />
        <Stack.Screen name="Notification" component={Notification} options={{headerTitle: '공지/FAQ'}} />
        <Stack.Screen name="Ask" component={Ask} options={{headerTitle: '1:1 문의'}} />
      </Stack.Navigator>
      <DrawerModal 
        visible={modalVisible === 'visible' ? true : false}
        onClose={() => setModalVisible('')}
        profile={() => setModalVisible('profile')}
        charge={() => setModalVisible('charge')}
        unlimited={() => setModalVisible('unlimited')}
        block={() => setModalVisible('block')}
        attract={() => setModalVisible('attract')}
        setting={() => setModalVisible('setting')}
        notification={() => setModalVisible('notification')}
        ask={() => setModalVisible('ask')}
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