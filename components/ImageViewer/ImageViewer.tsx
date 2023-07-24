import { Image } from 'react-native';

import styles from './Style';

interface Props {
  placeholderImageSource :  {uri : string};
  selectedImage :  string | undefined;
}

const ImageViewer = ({ placeholderImageSource , selectedImage } : Props ) => {
    const imageSource = selectedImage !== undefined ?
    {uri : selectedImage} : placeholderImageSource;
  return (
    <Image source={imageSource} style={styles.image} />
  );
}



export default ImageViewer;