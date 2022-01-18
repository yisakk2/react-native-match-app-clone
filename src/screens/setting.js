import * as React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { FirebaseContext } from '../provider/FirebaseProvider'

const Setting = () => {
  const context = React.useContext(FirebaseContext)
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.listItem}>
          <Text>알림</Text>
        </View>
        <TouchableOpacity 
          style={[styles.listItem, {backgroundColor: 'white'}]}
        >
          <Text>오늘카드 알림</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity 
          style={[styles.listItem, {backgroundColor: 'white'}]}
        >
          <Text>좋아요 알림</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity 
          style={[styles.listItem, {backgroundColor: 'white'}]}
        >
          <Text>메시지 알림</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity 
          style={[styles.listItem, {backgroundColor: 'white'}]}
        >
          <Text>쪽지 알림</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity 
          style={[styles.listItem, {backgroundColor: 'white'}]}
        >
          <Text>초이스 알림</Text>
        </TouchableOpacity>
        <View style={styles.listItem}>
          <Text>계정</Text>
        </View>
        <TouchableOpacity 
          style={[styles.listItem, {backgroundColor: 'white'}]}
        >
          <Text>계정휴면</Text>
          <Text style={{color: 'grey'}}>계정을 휴면하면 나의 카드를 상대에게 공개하지도,</Text>
          <Text style={{color: 'grey'}}>오늘의 카드를 받지도 않습니다.</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity 
          style={[styles.listItem, {backgroundColor: 'white'}]}
          onPress={() => context.signOut()}
        >
          <Text>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'center'
  },
  listItem: {
    height: 60,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  divider: {
    height: 1,
    backgroundColor: 'lightcolor'
  }
})

export default Setting