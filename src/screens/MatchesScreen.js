import React, { useEffect, useState } from 'react';
import { BlurView } from 'expo-blur';
import { StyleSheet, Text, ImageBackground, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MatchesScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userMatches, setUserMatches] = useState([]);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        if (user) {
          setCurrentUser(JSON.parse(user));
          const matches = await fetchUserMatches(user.id);
          setUserMatches(matches);
        }
      } catch (error) {
        console.error('Ошибка загрузки текущего пользователя:', error);
      }
    };

    loadCurrentUser();
  }, []);

  const fetchUserMatches = async (userId) => {
    try {
      const { data: matches, error } = await supabase
        .from('matches')
        .select('*')
        .eq('userId', userId);
      
      if (error) {
        throw new Error('Ошибка загрузки матчей');
      }

      return matches || [];
    } catch (error) {
      console.error('Ошибка загрузки матчей:', error);
      return [];
    }
  };

  if (!currentUser) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Matches</Text>
        <ScrollView>
          <View style={styles.allUsers}>
            {userMatches.map(match => (
              <View style={styles.user} key={match.id}>
                <Image source={{ uri: match.image }} style={styles.image} />
                <View style={styles.blurContainer}>
                  <BlurView intensity={50} tint="dark" style={styles.absolute}>
                    <View style={styles.nameContainer}>
                      <Text style={{ color: 'white', fontSize: 13 }}>{match.name}, {match.age}</Text>
                      <Text style={{ color: 'white', fontSize: 13 }}>{match.email}</Text>
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
    width: '47%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  allUsers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    paddingLeft: 10,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MatchesScreen;
