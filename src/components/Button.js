import React, { forwardRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Button = forwardRef((props, ref) => {
  const { text, ...pressableProps } = props;
  return (
    <Pressable ref={ref} {...pressableProps} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0038a8',
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default Button;
