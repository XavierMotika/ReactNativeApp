import { View, Image } from 'react-native';

import { TapGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

interface Props {
    imageSize : number;
    stickerSource : any;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View)

const EmojiSticker = ({ imageSize, stickerSource } : Props ) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  const onDrag = useAnimatedGestureHandler({
    onStart(event, context : any) {
      context.translateX  = translateX.value;
      context.translateY  = translateY.value;
    },
    onActive(event, context : any) {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  })

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
        
      }
    },
  });
  
  const imageStyle = useAnimatedStyle(() => {
    return {
      width : withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
      
    };
  });
  
  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView 
      style={[containerStyle, { top: -350 }]}
      >
        <TapGestureHandler 
           // onGestureEvent={onDoubleTap} problème venant de react native https://medium.com/@david.zhao.blog/setnativeprops-is-deprecated-please-update-props-using-react-state-instead-7d5b17e4c197
          numberOfTaps={2}>
          
        <AnimatedImage
          source={stickerSource}
          resizeMode="contain"
          style={[imageStyle , { width: imageSize, height: imageSize }]}
        />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
    
  );
}
export default  EmojiSticker;