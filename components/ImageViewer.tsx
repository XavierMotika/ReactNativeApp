import { StyleSheet, Image } from 'react-native';

function ImageViewer({ placeholderImageSource, selectedImage } : any) {
    const imageSource = selectedImage !== undefined
    ? { uri: selectedImage }
    : placeholderImageSource;
  return (
    <Image source={imageSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;