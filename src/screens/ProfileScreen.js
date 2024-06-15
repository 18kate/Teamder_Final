import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../../src/components/TeamderCard/index'; // Импортируем компонент Card
import users from '../../assets/data/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const user = users[12]; 
  return (
    <View style={styles.container}>
      <Card user={user} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%', 
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,

  },
});

export default ProfileScreen;
