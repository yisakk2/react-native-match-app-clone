import * as React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import PrepareNavigator from './src/navigation/PrepareNavigator'
import TutorialNavigator from './src/navigation/TutorialNavigator'
import FirebaseProvider, { FirebaseContext }  from './src/provider/FirebaseProvider'
import { NavigationContainer } from '@react-navigation/native'


export default function App() {
  return (
    <FirebaseProvider>
      <NavigationContainer>
        <FirebaseContext.Consumer>
          {({ user, profile }) => (
            user === null ? <PrepareNavigator /> : profile.tutorial ? <AppNavigator /> : <TutorialNavigator />
          )}
        </FirebaseContext.Consumer>
      </NavigationContainer>
    </FirebaseProvider>
  );
}