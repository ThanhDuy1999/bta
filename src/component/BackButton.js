import React from 'react';

import { TouchableOpacity, View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.pop()}>
      <FontAwesome name="arrow-left" size={20} color="white" />
    </TouchableOpacity>
  );
};

export default BackButton;
const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    left: 5,
    top: 5,
    zIndex: 100,
    width: 30,
    height: 30,
    backgroundColor: 'rgba(21,21,21,0.5)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});