import { View, Text, TextInput, StyleSheet, Alert, Image, Button as NativeButton, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { createClient } from '@supabase/supabase-js';
import games from '../../assets/data/games';
import AutoComplete from '../components/AutoComplete';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://iiizyurywsptbjqpucpb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpaXp5dXJ5d3NwdGJqcXB1Y3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTA0MzMsImV4cCI6MjAzMjkyNjQzM30.P0-QJl8K2x8OGr5N2WgHfEXz7vqGD83e7syYbe96K9g';
const supabase = createClient(supabaseUrl, supabaseKey);

const SignUpScreen = () => {
  const colorghost = '#0038a8';

  const REGISTERED_USERS_ROLE = 'registered_users';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [favoriteGame1, setFavoriteGame1] = useState('');
  const [favoriteGame2, setFavoriteGame2] = useState('');
  const [favoriteGame3, setFavoriteGame3] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('Image picker result:', result);
  
      if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
        const imageUrl = result.assets[0].uri;
        setImage(imageUrl);
      } else {
        console.log('Image picker cancelled or no image selected.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error picking image', error.message);
    }
  };
  

  const uploadImage = async (uri) => {
    console.log('Uploading image from URI:', uri);
  
    if (!uri) {
      console.error('Error uploading image: URI is undefined or empty');
      return null;
    }
  
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      console.log('Blob size:', blob.size);
      console.log('Blob:', blob);
  
      // Read blob data as ArrayBuffer
      const buffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      });
  
      console.log('Buffer size:', buffer.byteLength);
  
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
  
      console.log('Filename:', filename);
  
      const { data: imageData, error } = await supabase.storage
        .from('images')
        .upload(`public/${filename}`, buffer, {
          cacheControl: '3600',
          upsert: false,
        });
  
      console.log('Image upload response:', imageData);
      console.log('Error:', error);
  
      return imageData;
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error uploading image', error.message);
      return null;
    }
  };
  
  
  
  const handleSignUp = async () => {
    setLoading(true);

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        Alert.alert('Ошибка регистрации', signUpError.message);
        setLoading(false);
        return;
      }

      const { user } = signUpData;
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
        console.log('Uploaded image URL:', imageUrl);
        if (!imageUrl) {
          // Handle error uploading image
        }
      }

      const { data: roleData, error: roleError } = await supabase.auth.updateUser({
        role: REGISTERED_USERS_ROLE,
      });

      if (roleError) {
        Alert.alert('Ошибка при присвоении роли', roleError.message);
        setLoading(false);
        return;
      }

      const userData = {
        id: user.id,
        email,
        gender,
        name,
        bio,
        age,
        location,
        favoriteGame1,
        favoriteGame2,
        favoriteGame3,
        image_url: imageUrl,
      };

      const { error: insertError } = await supabase.from('users').insert([userData]);

      if (insertError) {
        Alert.alert('Ошибка сохранения данных пользователя', insertError.message);
        setLoading(false);
        return;
      }

      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Ошибка', 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // Сравниваем игнорируя регистр
    if (arr[mid].name.toLowerCase().includes(target)) {
      return mid; // Нашли элемент
    } else if (arr[mid].name.toLowerCase() < target) {
      left = mid + 1; // Ищем в правой половине
    } else {
      right = mid - 1; // Ищем в левой половине
    }
  }

  return -1; // Элемент не найден
};

const handleGameSearch = (text, setFilteredGames, setFavoriteGame) => {
  const searchText = text.toLowerCase();
  const sortedGames = [...games].sort((a, b) => a.name.localeCompare(b.name));

  const index = binarySearch(sortedGames, searchText);

  if (index !== -1) {
    const foundGame = sortedGames[index];
    setFilteredGames([foundGame]);
    setFavoriteGame(foundGame.name);
  } else {
    setFilteredGames([]);
    setFavoriteGame("");
  }
};

  useEffect(() => {
    (async () => {
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibraryStatus !== 'granted') {
        Alert.alert('Разрешения не предоставлены', 'Убедитесь, что ваше приложение имеет разрешения на доступ к галерее.');
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibraryStatus !== 'granted') {
        Alert.alert('Разрешения не предоставлены', 'Убедитесь, что ваше приложение имеет разрешения на доступ к галерее.');
      }
    })();
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Teamder</Text>
          <FontAwesome5 name="ghost" size={60} color={colorghost} />
        </View>
        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <NativeButton title="Select" onPress={pickImage} />
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsGenderModalVisible(true)}
      >
        <Text style={{ marginTop: 10, fontWeight: 'normal', height: 40 }}>{gender || 'Select gender'}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <AutoComplete
        placeholder="Favorite Game 1"
        value={favoriteGame1}
        onChangeText={(text) => handleGameSearch(text, setFavoriteGame1)}
        data={filteredGames}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleGameSearch(item.name, setFavoriteGame1)}
            style={{ padding: 10 }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <AutoComplete
        placeholder="Favorite Game 2"
        value={favoriteGame2}
        onChangeText={(text) => handleGameSearch(text, setFavoriteGame2)}
        data={filteredGames}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleGameSearch(item.name, setFavoriteGame2)}
            style={{ padding: 10 }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <AutoComplete
        placeholder="Favorite Game 3"
        value={favoriteGame3}
        onChangeText={(text) => handleGameSearch(text, setFavoriteGame3)}
        data={filteredGames}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleGameSearch(item.name, setFavoriteGame3)}
            style={{ padding: 10 }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button text={loading ? "Signing up..." : "Sign Up"} onPress={handleSignUp} disabled={loading} />
      <Text
        onPress={() => navigation.navigate('SignIn')}
        style={styles.textButton}
      >
        Already have an account? Sign In
      </Text>
      {/* Modal for gender selection */}
      <Modal visible={isGenderModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => { setGender('Male'); setIsGenderModalVisible(false); }}>
            <Text style={styles.modalItem}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setGender('Female'); setIsGenderModalVisible(false); }}>
            <Text style={styles.modalItem}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsGenderModalVisible(false)}>
            <Text style={styles.modalItem}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 70,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#0038a8',
    marginVertical: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginTop: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: '60%',
    borderRadius: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginLeft: 120,
  },
  logo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B006E',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalItem: {
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default SignUpScreen;
