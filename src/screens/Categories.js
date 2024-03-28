import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Easing,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import Animate, {FadeInDown} from 'react-native-reanimated';
// import { categories } from '../components/Catregories';

export default function Categories({active, setActive, categories,handleChangeCategory}) {
  return (
    <Animated.View 
    // entering={FadeInDown.duration(500).easing(Easing.ease)}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}>
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == active;
          let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/5';
          return (
            <TouchableOpacity
              // onPress={() => setActive(cat.strCategory)}
              onPress={() => handleChangeCategory(cat.strCategory)}
              key={index}
              className="flex items-center space-y-2">
              <View className={'rounded-full p-[6px] ' + activeButtonClass}>
                <Image
                  source={{uri: cat.strCategoryThumb}}
                  style={{width: 50, height: 50}}
                  className="rounded-full"
                />
              </View>

              <Text className="text-neutral-600">{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
