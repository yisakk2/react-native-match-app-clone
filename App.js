import * as React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import PrepareNavigator from './src/navigation/PrepareNavigator'
import TutorialNavigator from './src/navigation/TutorialNavigator'
import LoadingPage from './src/screens/loadingPage'
import FirebaseProvider, { FirebaseContext }  from './src/provider/FirebaseProvider'
import { NavigationContainer } from '@react-navigation/native'


export default function App() {
  return (
    <FirebaseProvider>
      <NavigationContainer>
        <FirebaseContext.Consumer>
          {({ user, profile, isloading }) => {
            if (isloading) {
              return <LoadingPage />
            } else {
              if (user === null) {
                return <PrepareNavigator />
              } else {
                return profile.tutorial ? <AppNavigator /> : <TutorialNavigator />
              }
            }
          }}
        </FirebaseContext.Consumer>
      </NavigationContainer>
    </FirebaseProvider>
  );
}