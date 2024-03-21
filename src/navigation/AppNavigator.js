// import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Home from '../screens/Home';
import About from '../screens/About';
import Contact from '../screens/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Login from '../auth/Login';
import {AuthContext} from '../context/AuthContext';
import image from '../Images/new.jpg';
import {Text, View, Image} from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        initialParams={{name: 'hamad', age: '15'}}
        options={{
          // tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="users" color={color} size={size} />
          ),
          tabBarBadge: 4,
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        initialParams={{name: 'hamad', age: '15'}}
        options={{
          // tabBarShowLabel: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="bell" color={color} size={size} />
          ),
          tabBarBadge: 4,
        }}
      />
    </Tab.Navigator>
  );
};

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{borderBottomWidth: 1, height: 140 ,marginVertical:20}}>
        <View style={{alignItems: 'center'}}>
          <Image source={image} style={{width: 64, height: 64 ,borderRadius:32}} />
        </View>
        <View style={{alignItems: 'center',marginVertical:20}}>
          <Text>Welcome To MY Profile</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{drawerPosition: 'left'}}>
      <Drawer.Screen
        name="RootDrawer"
        component={MyTabs}
        options={{
          drawerLabel: 'Home',
          headerTitle: 'Home',
          drawerIcon: ({color, size, focused}) => (
            <FontAwesome5Icon
              name={focused ? 'home' : 'heart'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="About"
        component={About}
        initialParams={{name: 'hamad', age: '30'}}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome5Icon name="info" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        initialParams={{name: 'hamad', age: '30'}}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome5Icon name="mobile" color={color} size={size} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default function AppNavigator() {
  const isAuthenticated = useContext(AuthContext);
  console.log('isAuthenticated', isAuthenticated);
  // const isAuthenticated = false;

  return (
    <NavigationContainer>
      {/* <MyDrawer /> */}
      {/* <Header /> */}
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}
        initialRouteName="Login">
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name="Root" component={MyDrawer} />
            {/* <Stack.Screen name="Home" component={Home} /> */}
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Contact" component={Contact} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Group>
        )}
      </Stack.Navigator>
      {/* <Footer /> */}
    </NavigationContainer>
  );
}

// import { View, Text } from 'react-native'
// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import Home from '../screens/frontend/Home';
// import About from '../screens/frontend/About';
// import Contact from '../screens/frontend/Contact';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const MyTabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           // tabBarShowLabel: false,
//           tabBarIcon: ({color, size}) => (
//             <FontAwesome5Icon name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Contact"
//         component={Contact}
//         options={{
//           // tabBarShowLabel: false,
//           tabBarIcon: ({color, size}) => (
//             <FontAwesome5Icon name="users" color={color} size={size} />
//           ), tabBarBadge: 4
//         }}
//       />
//       <Tab.Screen
//         name="About"
//         component={About}
//         initialParams={{name: 'hamad', age: '15'}}
//         options={{
//           // tabBarShowLabel: false,
//           tabBarIcon: ({color, size}) => (
//             <FontAwesome5Icon name="bell" color={color} size={size} />
//           ),
//           tabBarBadge: 4
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//       {/* <Header /> */}
//       {/* <Stack.Navigator
//         screenOptions={{
//           headerTitleAlign: 'center',
//           headerShown: true,
//         }}>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen
//           name="About"
//           component={About}
//           initialParams={{name: 'Hamad', age: '22'}}
//         />
//         <Stack.Screen name="Contact" component={Contact} />
//       </Stack.Navigator> */}
//       {/* <Footer /> */}
//     </NavigationContainer>
//   );
// }
