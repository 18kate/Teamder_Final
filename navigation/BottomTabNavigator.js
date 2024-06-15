import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../src/screens/HomeScreen';
import MatchesScreen from '../src/screens/MatchesScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import CustomTabBar from '../src/components/CustomTabBar'; 

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MatchesStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Matches"
      component={MatchesScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Matches" component={MatchesStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

const Navigation = () => <MainTabNavigator />;

export default (Navigation);