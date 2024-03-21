import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    //   setStoredData(data);
    // console.warn('savedData', value)
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
    //   if (storedData !== null) {
    //     setStoredData(storedData);
    //   }
  } catch (error) {
    console.error('Error loading data:', error);
  }
};
