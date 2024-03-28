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
  ('www.themealdb.com/api/json/v1/1/lookup.php?i=52772');
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
              className="font-bold text-neutral-700"
              style={{fontSize: hp(3)}}>
              {item?.strMeal}
            </Text>
            <Text
              className="font-medium text-neutral-500"
              style={{fontSize: hp(2)}}>
              {meals?.strArea}
            </Text>
          </View>
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
