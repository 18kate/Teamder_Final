import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../src/screens/sign-in';
import SignUpScreen from '../src/screens/sign-up';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
