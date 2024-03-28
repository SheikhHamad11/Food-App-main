import {useRef} from 'react';
import {StyleSheet, Text, View, PanResponder, Animated} from 'react-native'; //<--new
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const App = () => {
  // const pan = useRef(new Animated.ValueXY()).current;

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
  //       useNativeDriver: false,
  //     }),
  //     onPanResponderRelease: () => {
  //       Animated.spring(pan, {
  //         toValue: {x: 0, y: 0},
  //         useNativeDriver: false,
  //       }).start();
  //     },
  //   }),
  // ).current;

  const translationX = new Animated.Value(0);
  const translationY = new Animated.Value(0);
  const handlePanGesture = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translationX,
          translationY: translationY,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
   
       
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handlePanGesture}>
        <Animated.View
          style={[
            styles.square,
            {
              transform: [
                {translateX: translationX},
                {translateY: translationY},
              ],
            },
          ]}
          // {...panResponder.panHandlers}
        />
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  square: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
  },
});

// import React from 'react';
// import { Button, StyleSheet, View } from 'react-native';
// import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

// export default function App() {
//   const width = useSharedValue(100);

//   const handlePress = () => {
//     width.value = withSpring(width.value + 50);
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View style={{ ...styles.box, width }} />
//       <Button onPress={handlePress} title="Click me" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   box: {
//     height: 100,
//     backgroundColor: '#b58df1',
//     borderRadius: 20,
//     marginVertical: 64,
//   },
// });
