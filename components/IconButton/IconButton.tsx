import { Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';

import styles from './Style';

interface Props {
  icon :  string ;
  label : string ;
  onPress : any;
} 

const IconButton = ({ icon, label, onPress } : Props) => {
 
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon=== "refresh" ? "refresh" : "save-alt"} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}



export default IconButton;