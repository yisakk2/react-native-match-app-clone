import * as React from 'react'
import { StyleSheet, View, Text, Dimensions} from 'react-native'

const FindId = () => {
  return (
    <View style={styles.container}>
      <Text>FindId</Text>
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
})

export default FindId