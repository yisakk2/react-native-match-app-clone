import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Match = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, fontWeight: 'bold', lineHeight: 40}}>새로운 심쿵매칭 찾는 중</Text>
      <Text>언제 또 상대가 도착할 지 모르니</Text>
      <Text>수시로 확인해주세요.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, 
})

export default Match