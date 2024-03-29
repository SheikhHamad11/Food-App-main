import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animate,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import {
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from 'react-native-heroicons/outline';
import {SparklesIcon as SparklesIconOutline} from 'react-native-heroicons/outline';
export default function ReceipeDetails(props) {
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();
  const item = props.route.params;
  console.log('item', item);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecepiesDetail(item.idMeal);
  }, []);

  const getYoutubeVideoId = url => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  const getRecepiesDetail = async id => {
    try {
      const response = await axios.get(
        `https:themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      console.log('got recepies', response.data);
      if (response && response.data) {
        setMeals(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
      className="bg-white flex-1">
      <View className="flex flex-row justify-center">
        <Animated.Image
          source={{uri: item.strMealThumb}}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          sharedTransitionTag={item.strMealThumb}
        />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View className="px-4 justify-between space-y-4 pt-8">
          <View className="space-y-2">
            <Text
              className="font-extrabold text-neutral-700"
              style={{fontSize: hp(3)}}>
              {item?.strMeal}
            </Text>
            <Text
              className="font-medium text-neutral-500"
              style={{fontSize: hp(2)}}>
              {meals?.strArea}
            </Text>
          </View>
          <View className="flex-row justify-around">
            <View className="bg-amber-300 rounded-full flex p-2">
              <View className="bg-white rounded-full flex items-center justify-center p-1">
                {/* <Icon name="heart" color="red" style={{fontSize: hp(3)}} /> */}
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="black" />
              </View>
              <View className="flex items-center space-y-1 py-2">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  35
                </Text>
                <Text
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  mints
                </Text>
              </View>
            </View>

            <View className="bg-amber-300 rounded-full flex p-2">
              <View className="bg-white rounded-full flex items-center justify-center p-1">
                {/* <Icon name="user" color="black" style={{fontSize: hp(3)}} /> */}
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="black" />
              </View>
              <View className="flex items-center space-y-1 py-2">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  3
                </Text>
                <Text
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  servings
                </Text>
              </View>
            </View>

            <View className="bg-amber-300 rounded-full flex p-2">
              <View className="bg-white rounded-full flex items-center justify-center p-1">
                <FireIcon size={hp(4)} strokeWidth={2.5} color="black" />
              </View>
              <View className="flex items-center space-y-1 py-2">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  103
                </Text>
                <Text
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  cal
                </Text>
              </View>
            </View>

            <View className="bg-amber-300 rounded-full flex p-2">
              <View className="bg-white rounded-full flex items-center justify-center p-1">
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="black"
                />
              </View>
              <View className="flex items-center space-y-1 py-2">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700"></Text>
                <Text
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  Easy
                </Text>
              </View>
            </View>
          </View>
          {/* Ingredients */}
          <View className="space-y-4">
            <View>
              <Text
                style={{fontSize: hp(3)}}
                className="font-extrabold   text-neutral-700">
                Ingredients
              </Text>
            </View>

            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              1.
              {meals?.strIngredient1}
            </Text>
            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              2.{meals?.strIngredient2}
            </Text>
            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              3.{meals?.strIngredient3}
            </Text>
            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              4.{meals?.strIngredient4}
            </Text>
            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              5.{meals?.strIngredient5}
            </Text>
            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              6.{meals?.strIngredient6}
            </Text>
            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              7.{meals?.strIngredient7}
            </Text>
            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              8.{meals?.strIngredient8}
            </Text>
            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              9.{meals?.strIngredient9}
            </Text>
            <Text
              style={{fontSize: hp(1.6)}}
              className="font-semibold   text-neutral-700">
              10.{meals?.strIngredient10}
            </Text>
          </View>

          {/* Instructions */}
          <View className="space-y-4">
            <Text
              style={{fontSize: hp(3)}}
              className="font-extrabold   text-neutral-700">
              Instructions
            </Text>
            <View className="ml">
              <Text style={{fontSize: hp(1.6)}} className="text-neutral-700">
                {meals?.strInstructions}
              </Text>
            </View>
          </View>

          {/* Youtube video */}
          {meals?.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{fontSize: hp(3)}}
                className="font-extrabold   text-neutral-700">
                Receipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meals.strYoutube)}
                  // videoId="6R8ffRRJcrg"
                  height={hp(30)}
                />
              </View>
            </View>
          )}
        </View>
      )}

      <View className="w-full flex flex-row justify-between absolute item-center pt-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-3 rounded-full bg-white ml-3">
          <Icon name="arrow-left" style={{fontSize: 20}} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFav(!isFav)}
          className="p-3 rounded-full bg-white mr-3">
          <Icon
            name="heart"
            color={isFav ? 'red' : 'grey'}
            style={{fontSize: 20}}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
