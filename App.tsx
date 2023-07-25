import { StatusBar } from 'expo-status-bar';
import {View , Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";



import Button from './components/Button/Button';
import ImageViewer from './components/ImageViewer/ImageViewer';
import CircleButton from './components/CircleButton/CircleButton';
import IconButton from './components/IconButton/IconButton';
import EmojiPicker from './components/EmojiPicker/EmojiPicker';
import EmojiList from './components/EmojiList/EmojiList';
import EmojiSticker from './components/EmojiSticker/EmojiSticker';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

import styles from './Style';


const PlaceholderImage : {uri : string} = require('./assets/images/background-image.png');

export default function App() {
  
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const imageRef = useRef<null | any>(null) ;

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setModalVisible(true)
  };

  const onModalClose = () => {
    setModalVisible(false)
  };

  const onSaveImageAsync = async () => {
    if ( Platform.OS !== 'web'){
    try {
      const localUri = await captureRef(imageRef, {
        height : 440,
        quality : 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri){
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  } else 
    try {
      const dataUrl = await domtoimage.toJpeg(imageRef.current, {
        quality: 0.95,
        width: 320,
        height: 440,
      });

      let link = document.createElement('a');
      link.download = 'sticker-smash.jpeg';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} /> 
          {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>
      {showAppOptions? (
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
        </View>
      </View>
      ) : (
      <View style={styles.footerContainer}>
        <Button  theme = "primary" label = "Choose a photo" onPress = {pickImageAsync} />
        <Button  theme = "" label="Use this photo" onPress={() => setShowAppOptions(true)} />
      </View>  
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
    );
  }


