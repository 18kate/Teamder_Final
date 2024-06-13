import React from 'react';
import {View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator'; 
import MainTabNavigator from './navigation/BottomTabNavigator'; 
import Button from './src/components/Button';
import { Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthProvider from './src/providers/AuthProvider';

const RootStack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Auth" component={AuthNavigator} />
          <RootStack.Screen name="Main" component={MainTabNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
