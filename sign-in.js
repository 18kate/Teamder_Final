import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const colorghost = '#0038a8'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        Alert.alert('Ошибка входа', error.message);
      } else {
        navigation.replace('Main');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style = {styles.logo}>
        <Text style = {styles.title}>Teamder </Text>
        <FontAwesome5 name="ghost" size={60} color={colorghost}  />
      </View>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button text={loading ? "Signing in...": "Sign in"} onPress={handleSignIn} disabled={loading} />
      <Text
        onPress={() => navigation.navigate('SignUp')}
        style={styles.textButton}
      >
        Create an account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    marginTop: 70,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#0038a8',
    marginVertical: 10,
  },
  logo: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 60,
    position: 'absolute',
  },
  title: {
    fontSize: 40,
    color: '#4B006E',
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SignInScreen;