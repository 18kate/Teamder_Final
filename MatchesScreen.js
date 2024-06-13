import React, {useEffect, useState} from 'react';
import { BlurView } from 'expo-blur';
import { StyleSheet, Text, ImageBackground, View, SafeAreaView, ScrollView, Image, FlatList} from 'react-native';
import users from '../../assets/data/users';

const MatchesScreen = () => {

  return (
    <SafeAreaView style={styles.root}>
        <View style={styles.container}>
            <Text style={styles.title}>
            Matches
            </Text>
            <ScrollView>
                <View style={styles.allUsers} >
                    {users.map(user => (
                        <View style={styles.user} key = {user.id}>
                            <Image source ={{uri: user.image }} style= {styles.image} />
                            <View style={styles.blurContainer}>
                                <BlurView intensity={50} tint="dark" style={styles.absolute}>
                                    <View style={styles.nameContainer}>
                                        <Text style={{color: 'white', fontSize: 13}}>{user.name}, {user.age}</Text>
                                        <Text style={{color: 'white', fontSize: 13}}>{user.name}@gmail.com</Text>
                                    </View>
                                </BlurView>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    root: {
      width: '100%',
      flex: 1,
      padding: 10,
    },
    container: {
      padding: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
    title: {
      fontSize: 30,
      color: '#4B006E',
      marginBottom: 10,
    },
    user: {
      width: '47%', // Ширина карточки пользователя в две колонки
      marginBottom: 20,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 20,
    },
    allUsers: {
      flexDirection: 'row', // Расположение карточек в ряд
      flexWrap: 'wrap', // Разрешение переноса карточек на новую строку
      justifyContent: 'space-between', // Равномерное распределение пространства между карточками
    },
    blurContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '20%',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      overflow: 'hidden',
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      paddingLeft: 10, // Small left padding for the text
    },
    nameContainer: {
      flex: 1,
      justifyContent: 'center',
    },
  });
  

export default (MatchesScreen);