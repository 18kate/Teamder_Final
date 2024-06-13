import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AnimatedStack from '../components/AnimatedStack';

const ButtonAnimation = ({ onPress, icon, color }) => {
  const translateX = useSharedValue(0);

  const handlePress = () => {
    translateX.value = withSpring(icon === 'cross' ? -200 : 200, {}, () => {
      onPress();
      translateX.value = 0;
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedButton, { backgroundColor: color }, animatedStyle]}>
        <TouchableOpacity onPress={handlePress}>
          {icon === 'cross' ? (
            <Entypo name="cross" size={60} color="#FFF" />
          ) : (
            <FontAwesome5 name="ghost" size={60} color="#FFF" />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ButtonAnimation;
