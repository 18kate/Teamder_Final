import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, ImageBackground, View , useWindowDimensions} from 'react-native';

import Animated, {
  useSharedValue, 
  useAnimatedStyle,
  withSpring, 
  interpolate,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { 
  PanGestureHandler, 
  GestureHandlerRootView, 
  GestureDetector, 
  Gesture 
} from 'react-native-gesture-handler';

const END_POSITION = 100;
const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const AnimatedStack = (props) => {
  const {data, renderItem, onSwipeLeft, onSwipeRight} = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = data[currentIndex];
  const nextProfile = data[nextIndex];

  const {width: screenWidth} = useWindowDimensions();
  const hiddenTransLateX = 2 * screenWidth;

  const translateX = useSharedValue(0);

  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTransLateX],[0, ROTATION]) + 'deg'
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
      translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));
  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: interpolate(
        translateX.value, 
        [-hiddenTransLateX, 0, hiddenTransLateX],
        [1, 0.8, 1])}
    ],
    opacity: interpolate(
      translateX.value, 
      [-hiddenTransLateX, 0, hiddenTransLateX],
      [1, 0.6, 1],
    ),
  }));

const panGesture = Gesture.Pan()
  .onStart(()=> {
    console.log('Touch start');
  })
  .onUpdate(event => {
    translateX.value = event.translationX;
  })
  .onEnd(event => {
    console.log('Touch ended');
    let onSwipe = null;
    if (translateX.value > END_POSITION && event.velocityX > SWIPE_VELOCITY) {
      translateX.value = withSpring(hiddenTransLateX);
      onSwipe = onSwipeRight;
    } else if (translateX.value < -END_POSITION && event.velocityX < -SWIPE_VELOCITY) {
      translateX.value = withSpring(-hiddenTransLateX);
      onSwipe = onSwipeLeft;
    } else {
      translateX.value = withSpring(0);
      return;
    }
    runOnJS(setCurrentIndex)(currentIndex + 1);
    onSwipe && runOnJS(onSwipe)(currentProfile);
  });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);


  return (
    <View style = {styles.pageContainer}>
      {nextProfile && (
        <View style = {styles.nextCardContainer}>
          <Animated.View style = {[styles.card, nextCardStyle]}>
            {renderItem({item: nextProfile})}
          </Animated.View>
        </View>
      )}

      <GestureHandlerRootView style = {styles.pageContainer}>
        <View style = {styles.discover}>
          <Text style = {{fontSize: 30, color: '#4B006E',}}> Discover</Text>
        </View>

        {currentProfile && (
          <GestureDetector gesture={panGesture}>
            <Animated.View style = {[styles.AnimatedCard, cardStyle]}>
              {renderItem({item: currentProfile})}
            </Animated.View>
          </GestureDetector>
        )}
        
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%', 
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  AnimatedCard: {
    width: '90%', 
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,

  },
  discover: {
    width: '100%', 
    height: '90%',
    alignItems: 'center',
    flex: 0.4,
    marginBottom: 150,
    position: 'absolute',
  },
  nextCardContainer: {
    width: '90%', 
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    position: 'absolute',
  },
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

});
export default AnimatedStack;