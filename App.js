import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PodcastList from './Components/PodcastList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="PodcastsList" component={PodcastList} />
          </Stack.Navigator>
          <StatusBar style="auto" />
      </NavigationContainer>
  );
}
