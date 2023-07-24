import { Modal, View, Text, Pressable, GestureResponderEvent } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from './Style';

interface Props {
  isVisible : boolean;
  children : any;
  onClose : (((event: GestureResponderEvent) => void) | null | undefined);
}

const EmojiPicker = ({ isVisible , children, onClose } : Props ) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
  
}
export default EmojiPicker;

