import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PodcastListPage from './Components/PodcastListPage';
import PodcastViewPage from './Components/PodcastViewPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="PodcastListPage" component={PodcastListPage} />
              <Stack.Screen name="PodcastViewPage" component={PodcastViewPage} />
          </Stack.Navigator>
          <StatusBar style="auto" />
      </NavigationContainer>
  );
}
