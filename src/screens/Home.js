import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Categories from '../screens/Categories';
import axios from 'axios';
import Recepies from './Recepies';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function Home({navigation}) {
  const [active, setActive] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [recepies, setRecepies] = useState([]);
  useEffect(() => {
    getCategories();
    getRecepies();
  }, []);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://themealdb.com/api/json/v1/1/categories.php',
      );
      // console.log('response', response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getRecepies = async (category = 'Beef') => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      console.log('got recepies', response.data);
      if (response && response.data) {
        setRecepies(response.data.meals);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChangeCategory = (category) => {
    getRecepies(category);
    setActive(category);
    setRecepies([]);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="pt-6 space-y-6">
        {/* greetings and bell icon  */}
        <View className="flex justify-between flex-row items-center mx-4">
          <Image
            source={require('../Images/new.jpg')}
            style={{width: 40, height: 40}}
            className="rounded-full"
          />
          <Icon name="bell" color={'black'} style={{fontSize: 30}} />
        </View>

        {/* greetings and puncth line */}
        <View className="mx-4 space-y-2">
          {/* <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">
            Hello,Hamad!
          </Text> */}
          <View>
            <Text
              style={{fontSize: hp(3.8)}}
              className=" font-bold text-neutral-600">
              Make your own food,
            </Text>
          </View>
          <Text style={{fontSize: hp(3.8)}} className="font-bold text-neutral-600">
            stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="rounded-full bg-black/5 p-[6px] mx-4 flex-row items-center">
          <TextInput
            placeholder="Search any receipe"
            placeholderTextColor={'grey'}
            style={{fontSize: hp(1.7),color:'black'}}
            className="flex-1 text-base tracking-widest pl-3"
          />
          <View className="rounded-full bg-white p-3">
            <Icon name="search" color="black" style={{fontSize: 20}} />
          </View>
        </View>

        {/* categories */}
        {categories.length > 0 && (
          <View>
            <Categories
              categories={categories}
              active={active}
              setActive={setActive}
              handleChangeCategory={handleChangeCategory}
            />
          </View>
        )}

        {/* recepies */}
        <View>
          <Recepies
            recepies={recepies}
            categories={categories}
            active={active}
            navigation={navigation}
            setActive={setActive}
          />
        </View>
      </ScrollView>
    </View>
  );
}
