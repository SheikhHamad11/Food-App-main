import {View, Text, Pressable, Image, Animate} from 'react-native';
import React from 'react';
// import MasonryList from '@react-native-seoul/masonry-list';
import MasonryList from '@react-native-seoul/masonry-list';
// import {categories} from '../components/Catregories';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Loading from '../components/Loading';
import {useNavigation} from '@react-navigation/native';
export default function Recepies({categories, recepies}) {
  'worklet';
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text className="font-semibold text-neutral-600 text-2xl">Recipes</Text>
      {categories.length == 0 || recepies.length == 0 ? (
        <Loading size="large" color="orange" />
      ) : (
        <MasonryList
          data={recepies}
          keyExtractor={(item, index) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => (
            <CardItem item={item} index={i} navigation={navigation} />
          )}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
}

const CardItem = ({item, index, navigation}) => {
  'worklet';
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      // entering={FadeInDown.delay(100).duration(600).springify().damping(20)}
      >
      <Pressable
        style={{
          width: '100%',
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        onPress={() => navigation.navigate('ReceipeDetails', {...item})}
        className="flex justify-center mb-4 space-y-1">
        {/* {console.warn('item', item)} */}
        <Animated.Image
          source={{uri: item.strMealThumb}}
          sharedTransitionTag={item.strMealThumb}
          style={{
            width: 170,
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
        />

        <Text
          className="text-neutral-600  font-bold ml-2"
          style={{fontSize: hp(1.5)}}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + '...'
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
