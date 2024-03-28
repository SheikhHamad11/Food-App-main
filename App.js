// import { View, Text } from 'react-native'
import React from 'react';
import H from './src/Weather';
import Home from './src/screens/Home';
import WelcomeScreen from './src/screens/Categories.js';
import Categories from './src/screens/Welcome';
import {NavigationContainer} from '@react-navigation/native';
// import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Recepies from './src/screens/Recepies.js';
import ReceipeDetails from './src/screens/ReceipeDetails.js';
import { Text } from 'react-native';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Categories}>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={Categories}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home1"
          component={Home}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Recepies"
          component={Recepies}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ReceipeDetails"
          component={ReceipeDetails}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
