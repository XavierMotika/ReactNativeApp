import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer : {
      flex : 1,
      paddingTop : 58,
    },
    footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
    },
    optionsContainer: {
      position: 'absolute',
      bottom: 80,
    },
    optionsRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

  export default styles;
  