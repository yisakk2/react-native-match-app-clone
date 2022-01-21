import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const PartnerProfile = ({ route }) => {
  const { profile } = route.params

  console.log(profile)

  return (
    <View style={styles.container}>
      <Text>PartnerProfile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PartnerProfile