import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const getIcon = (name) => {
            switch (name) {
              case 'Home':
                return <MaterialCommunityIcons name="cards" size={24} color={isFocused ? '#0038a8' : '#222'} />;
              case 'Matches':
                return <AntDesign name="heart" size={24} color={isFocused ? '#0038a8' : '#222'} />;
              case 'Profile':
                return <MaterialCommunityIcons name="account" size={24} color={isFocused ? '#0038a8' : '#222'} />;
              default:
                return null;
            }
          };
  
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tab, isFocused ? styles.tabFocused : null]}
            >
              {getIcon(route.name)}
              <Text style={styles.tabText}>{route.name}</Text>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
    },
    tabFocused: {
      backgroundColor: '#f0f0f0',
    },
    tabText: {
      marginTop: 5,
      fontSize: 12,
      color: '#222',
    },
  });
  
  export default CustomTabBar;