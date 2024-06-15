import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Card from '../../src/components/TeamderCard/index'; // Импортируем компонент Card
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase'; // Импортируем supabase

const ProfileScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Загрузка текущего пользователя из AsyncStorage
        const user = await AsyncStorage.getItem('currentUser');
        if (user) {
          setCurrentUser(JSON.parse(user));
        }
      } catch (error) {
        console.error('Ошибка загрузки текущего пользователя:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card user={currentUser} />
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
