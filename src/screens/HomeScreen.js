import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AnimatedStack from '../components/AnimatedStack';
import ButtonAnimation from '../components/ButtonAnimation';
import Card from '../components/TeamderCard';
import users from '../../assets/data/users';

const HomeScreen = () => {
  const colorcross = '#F27121';
  const colorghost = '#0038a8';

  const onSwipeLeft = (user) => {
    console.warn("swipe left", user.name);
  };

  const onSwipeRight = (user) => {
    console.warn("swipe right", user.name);
  };

  return (
    <View style={styles.pageContainer}>
      <AnimatedStack
        data={users}
        renderItem={({ item }) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => onSwipeLeft(users[0])}>
          <Entypo name="cross" size={60} color={colorcross} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSwipeRight(users[0])}>
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
