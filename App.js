import * as React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import PrepareNavigator from './src/navigation/PrepareNavigator'
import FirebaseProvider, { FirebaseContext }  from './src/provider/FirebaseProvider'
import { NavigationContainer } from '@react-navigation/native'


export default function App() {
  return (
    <FirebaseProvider>
      <NavigationContainer>
        <FirebaseContext.Consumer>
          {({ user }) => {
            return user === null ? <PrepareNavigator /> : <AppNavigator />
          }}
        </FirebaseContext.Consumer>
      </NavigationContainer>
    </FirebaseProvider>
  );
}