import { useState } from 'react';
import { FlatList, Image, Platform, Pressable } from 'react-native';

import styles from './Style';

interface Props {
  onSelect : Function ;
  onCloseModal : Function ;
}

const EmojiList = ({ onSelect, onCloseModal } : Props) => {
  const [emoji] = useState([
    
    require('C:/Users/Stagiaire/Documents/workspace/front/ReactNative/ReactNative/assets/images/emoji1.png'),
    require('C:/Users/Stagiaire/Documents/workspace/front/ReactNative/ReactNative/assets/images/emoji2.png'),
    require('C:/Users/Stagiaire/Documents/workspace/front/ReactNative/ReactNative/assets/images/emoji3.png'),
    require('C:/Users/Stagiaire/Documents/workspace/front/ReactNative/ReactNative/assets/images/emoji4.png'),
    require('C:/Users/Stagiaire/Documents/workspace/front/ReactNative/ReactNative/assets/images/emoji5.png'),
    require('C:/Users/Stagiaire/Documents/workspace/front/ReactNative/ReactNative/assets/images/emoji6.png'),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}>
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
}

export default EmojiList;
