import {View, Text, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

export default function WelcomeScreen({navigation}) {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  // const navigation = useNavigation();
  useEffect(() => {
    ring1Padding.value=0;
    ring2Padding.value=0;

    setTimeout(
      () => (ring1Padding.value = withSpring(ring1Padding.value + 50)),
      200,
    );
    setTimeout(
      () => (ring2Padding.value = withSpring(ring2Padding.value + 50)),
      300,
    );

    setTimeout(() => navigation.navigate('Home1'), 2000);
  },[]);
  return (
    <View className="justify-center flex-1 items-center bg-amber-500">
      <StatusBar barStyle={'dark-content'}  backgroundColor={'#F3920B'} />
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{padding: ring2Padding}}>
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{padding: ring1Padding}}>
          <Image
            source={require('../Images/1.png')}
            style={{width: 200, height: 200}}
          />
        </Animated.View>
      </Animated.View>
      <Text className="text-center  text-white text-3xl">Foody</Text>
      <Text className="text-center  text-white text-xl tracking-widest">Foody is always right</Text>
    </View>
  );
}
