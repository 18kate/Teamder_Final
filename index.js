import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { StyleSheet, Text, ImageBackground, View , Image} from 'react-native';


const Card = (props) => {
    const {name, bio, image, game1, game2, game3, location, age} = props.user;
    return (
         <View style = {styles.card}>
            <ImageBackground source ={{uri: image }} style = {styles.image} >
            <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
                <View style = {styles.info_card}>
                <Text style = {styles.name}> {name}, {age}</Text>
                <Text style = {styles.bio}> {bio}</Text>
                </View>
                <View style = {styles.all_games}>
                <Text style = {styles.game1}> {game1}</Text>
                <Text style = {styles.game2}> {game2}</Text>
                <Text style = {styles.game3}> {game3}</Text>
                </View>
                <Text style = {styles.location}> {location}</Text>
            </BlurView>
            </ImageBackground>  
        </View>
     );
};

const styles = StyleSheet.create({
    card: {
      width: '100%', 
      height: '100%',
      borderRadius: 20,
      Shadowcolor: "#000", 
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.35,
      shadowRadius: 6.68,
      elevation: 11,
    },
    image: {
      width: '100%', 
      height: '100%',
      borderRadius: 20,
      overflow: 'hidden',
      justifyContent: 'flex-end',
    },
    info_card: {
      padding: 10,
      marginHorizontal: 10,
    },
    all_games: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
    },
  
    discover: {
      width: '100%', 
      height: '5%',
      alignItems: 'center',
      textAlignVertical: 'top', 
      marginBottom: 20
    },
    name: {
      fontSize: 30,
      color: 'white',
    },
    bio: {
      fontSize: 14,
      color: 'white',
      lineHeight: 30,
    },
    game1: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
      lineHeight: 40,
    },
    game2: {
      fontSize: 16, 
      color: 'white',
      fontWeight: 'bold',
      lineHeight: 40,
    },
    game3: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
      lineHeight: 40,
    },
    location: {
      fontSize: 14,
      color: 'white',
      padding: 10 
    }
  
  });

export default Card;