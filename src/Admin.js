import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import CustomerList from './CustomerList';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountScreen from './Account';
import StoryScreen from './Single';
import ReadScreen from './Read';
import Customer from './SpeCustomer';
import {Image, View} from 'react-native';
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const bottomTab = createBottomTabNavigator();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////--------------------STORAGE-SCREEN---------------------///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Storage = () => {
  return (
    <Stack.Navigator
      initialRouteName="Storage"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#262626',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name={'Storage'}
        component={BottomNavigator}
        options={{
          headerShown: false,
          title: 'Tủ Truyện',
        }}
      />
      <Stack.Screen
        name={'Customer'}
        component={Customer}
        options={{
          title:''
        }}
      />
      <Stack.Screen
        name={'CustomerList'}
        component={CustomerList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////--------------------ACCOUNT-SCREEN---------------------///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Account = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#262626',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name={'Account'}
        component={AccountScreen}
        options={{
          headerShown: false,
          title: 'Tài Khoản',
        }}
      />
    </Stack.Navigator>
  );
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////--------------------EXPLORE-SCREEN---------------------///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const Explore = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="Explore"
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#262626',
//         },
//         headerTintColor: '#fff',
//       }}>
//       <Stack.Screen
//         name={'Explore'}
//         component={ExploreScreen}
//         options={{
//           title: 'Truyện Mới',
//         }}
//       />
//       <Stack.Screen
//         name={'Story'}
//         component={StoryScreen}
//         options={({navigation}) => ({
//           headerShown: false,
//         })}
//       />
//       <Stack.Screen
//         name={'Read'}
//         component={ReadScreen}
//         options={({navigation}) => ({
//           headerShown: false,
//         })}
//       />
//     </Stack.Navigator>
//   );
// };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////--------------------ACCOUNT-SCREEN---------------------///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////-------------------BOTTOM-MENU--------------------//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BottomNavigator = () => {
  return (
    <bottomTab.Navigator
      initialRouteName="Danh Sách Người Dùng"
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: '#262626'},

        tabBarIcon: ({focused, color}) => {
          let iconName = '';
          if (route.name === 'Danh Sách Người Dùng') {
            iconName = focused ? 'book-open-variant' : 'book-multiple';
          } 
          // else if (route.name === 'Khám Phá') {
          //   iconName = focused ? 'book-search' : 'book-search-outline';
          // } else if (route.name === 'Xếp Hạng') {
          //   iconName = focused ? 'chart-box' : 'chart-box-outline';
          // } 
          else if (route.name === 'Tài Khoản') {
            iconName = focused ? 'account-box' : 'account-box-outline';
          }
          return <Icon name={iconName} size={25} color={color} />;
        },

        tabBarActiveTintColor: 'white',
      })}>
      <bottomTab.Screen
        name="Danh Sách Người Dùng"
        component={CustomerList}
        options={{
         title: 'Người Dùng' ,
          headerStyle: {backgroundColor: '#262626'},
          headerTintColor: '#fff',
        }}
      />

      {/* <bottomTab.Screen
        name="Khám Phá"
        component={Explore}
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#262626'},
          headerTintColor: '#fff',
        }}
      /> */}

      <bottomTab.Screen
        name="Tài Khoản"
        component={Account}
        options={{
          headerStyle: {backgroundColor: '#262626'},
          headerTintColor: '#fff',
        }}
      />
    </bottomTab.Navigator>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const App = () => {
  return <Storage />;
};
export default App;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////-------------------STYLE-sHEET--------------------//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  avatar: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
