import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AnimatedStack from '../components/AnimatedStack';
import Card from '../components/TeamderCard';
import { supabase } from '../lib/supabase'; // Импортируем supabase

const HomeScreen = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const colorcross = '#F27121';
  const colorghost = '#0038a8';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Получаем текущего пользователя из Supabase
        const { user, error } = await supabase.auth.user();
        if (error) {
          throw error;
        }
        setCurrentUser(user);

        // Получаем список пользователей из таблицы users в Supabase, исключая текущего пользователя
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .neq('id', user.id); // Исключаем текущего пользователя

        if (fetchError) {
          throw fetchError;
        }

        setUsersData(data);
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const onSwipeLeft = (user) => {
    console.warn("swipe left", user.name);
  };

  const onSwipeRight = (user) => {
    console.warn("swipe right", user.name);
  };

  return (
    <View style={styles.pageContainer}>
      <AnimatedStack
        data={usersData}
        renderItem={({ item }) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => onSwipeLeft(usersData[0])}>
          <Entypo name="cross" size={60} color={colorcross} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSwipeRight(usersData[0])}>
          <FontAwesome5 name="ghost" size={60} color={colorghost} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
  },
});

export default HomeScreen;
