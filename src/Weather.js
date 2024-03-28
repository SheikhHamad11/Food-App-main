import {
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {debounce} from 'lodash';
import {fetchLocations, fetchweatherForecast} from './api/weather';
import * as Progress from 'react-native-progress';
import {getData, saveData} from './components/asyncStorage';
export default function Home() {
  const [showSearch, toogleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLaoding] = useState(true);
  const handleLocation = loc => {
    console.log('location', loc);
    setLocations([]);
    setLaoding(true);
    fetchweatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setWeather(data);
      saveData('city', loc.name);
      setLaoding(false);
      console.log('got forecast', data);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let mycity = await getData('city');
    let cityName = 'Lahore';
    if (mycity) cityName = mycity;
    fetchweatherForecast({
      cityName,
      days: 7,
    }).then(data => {
      setWeather(data);
      setLaoding(false);

      // console.log('got forecast', data);
    });
  };

  const handleSearch = value => {
    console.log('value', value);

    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        setLocations(data);
        // console.log('got locations', data);
      });
    }
  };

  const {location, current} = weather;

  const handleDebounce = useCallback(debounce(handleSearch, 1200), []);
  return (
    <View className="flex-1 relative">
      <StatusBar barStyle={'default'} backgroundColor={'#00266b'} />
      <Image
        source={require('./Images/images.jpg')}
        blurRadius={10}
        className="absolute h-full w-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Text className="text-white text-3xl">Loading...</Text>
        </View>
      ) : (
        <View className="flex flex-1">
          <View style={{height: '7%'}} className="m-3  relative z-50 ">
            <View
              className="flex-row justify-end items-center  rounded-full p-1"
              style={{backgroundColor: showSearch ? 'gray' : null}}>
              {showSearch ? (
                <TextInput
                  onChangeText={handleDebounce}
                  placeholder="Search city"
                  placeholderTextColor={'lightgray'}
                  className="pl-6   flex-1 h-10 text-base text-white "
                />
              ) : null}
              <TouchableOpacity onPress={() => toogleSearch(!showSearch)}>
                <Icon
                  name="search"
                  style={{fontSize: 20, marginRight: 10}}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>

         
          {/* forecast section  */}
          <View className="mx-3 flex justify-between   flex-1 mb-2 z-10">
            {/* location  */}
            <Text className="text-white text-center text-2xl font-bold">
              {location?.name},
              <Text className="text-lg font-semibold text-gray-300">
                {'' + location?.country}
              </Text>
            </Text>
            {/* weather image  */}
            <View className="flex-row justify-center">
              <Image
                source={{uri: 'https://' + current?.condition?.icon}}
                className="w-52 h-52"
              />
            </View>
            {/* degree celcius  */}
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {Math.round(current?.temp_c)}&#176;c
              </Text>

              <Text className="text-center font-bold text-white text-xl tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>

            {/* other stats  */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('./Images/wind.png')}
                  className="h-6 w-6"
                />
                <Text className="text-center font-bold text-white text-xl tracking-widest">
                  {current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image source={require('./Images/2.png')} className="h-6 w-6" />
                <Text className="text-center font-bold text-white text-xl tracking-widest">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('./Images/sun.png')}
                  className="h-6 w-6"
                />
                <Text className="text-center font-bold text-white text-xl tracking-widest">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>

            {/* forecast section for next days  */}
            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-5 space-x-2">
                <Icon name="calendar" style={{fontSize: 20, color: 'white'}} />
                <Text className="text-base text-white ">Daily Forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{paddingHorizontal: 15}}
                showsHorizontalScrollIndicator={false}>
                {weather?.forecast?.forecastday?.map((item, index) => {
                  let date = new Date(item.date);
                  let options = {weekday: 'long'};
                  let dayName = date.toLocaleDateString('en-US', options);
                  dayName.split('')[0];
                  return (
                    <View
                      key={index}
                      className="flex-center   bg-gray-500 items-center w-28 py-3 rounded-3xl space-y-1 mr-4 ">
                      <Image
                        source={{uri: 'https://' + item?.day?.condition?.icon}}
                        className="w-11 h-11"
                      />
                      <Text className="text-white">{item.date}</Text>
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-gray">
                        {item?.day?.condition?.text}
                      </Text>
                      <Text className="text-white text-xs font-semibold">
                        {Math.floor(item?.day?.mintemp_c)} &#176;c -{' '}
                        {Math.floor(item?.day?.maxtemp_c)} &#176;c
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      )}
       {locations.length > 0 && showSearch ? (
            <View
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="absolute w-96 mr-1 ml-1   bg-gray-300 top-16 rounded-3xl z-50">
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? 'border-b-2 border-b-gray-400'
                  : '';
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      'flex-row items-center border-0 p-3 px-5 mb-1 ' +
                      borderClass
                    }>
                    <Icon
                      name="map-marker-alt"
                      style={{fontSize: 20}}
                      color="gray"
                    />
                    <Text className="text-black text-lg ml-2">
                      {loc?.name}, {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
    </View>
  );
}
