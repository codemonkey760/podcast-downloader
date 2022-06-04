import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { legacy_createStore } from 'redux'

import ProgramPage from './Components/ProgramPage'
import ConfigureProgramPage from './Components/ConfigureProgramPage'
import PodcastListPage from './Components/PodcastListPage'

import reducers from './reducers/reducers'

// TODO: redux toolkit looks promising ... study that when I have time
// for now lets use the legacy createStore to get the deprecation notice out of my face
const store = legacy_createStore(reducers)

const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <Provider store={store}>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen name="ProgramPage" component={ProgramPage} />
                  <Stack.Screen name="ConfigureProgramPage" component={ConfigureProgramPage} />
                  <Stack.Screen name="PodcastListPage" component={PodcastListPage} />
              </Stack.Navigator>
              <StatusBar style="auto" />
          </NavigationContainer>
      </Provider>
  );
}
