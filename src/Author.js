import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import StorageScreen from './AuthorStorage';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountScreen from './Account';
import StoryScreen from './AuthorStory';
import ReadScreen from './Read';
import ExploreScreen from './Explore';
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
          title: 'Truyện Đã Xuất Bản',
        }}
      />
      <Stack.Screen
        name={'Story'}
        component={StoryScreen}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={'Read'}
        component={ReadScreen}
        options={({navigation}) => ({
          headerShown: false,
        })}
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
const Explore = () => {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#262626',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name={'Explore'}
        component={ExploreScreen}
        options={{
          title: 'Truyện Mới',
        }}
      />
      <Stack.Screen
        name={'Story'}
        component={StoryScreen}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={'Read'}
        component={ReadScreen}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////--------------------ACCOUNT-SCREEN---------------------///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const TopStorage = () => (
//   <TopTab.Navigator
//     initialRouteName="Giới thiệu"
//     screenOptions={{
//       tabBarStyle: {backgroundColor: '#262626'},
//       tabBarIndicatorStyle: {backgroundColor: 'white'},
//       tabBarLabelStyle: {color: 'white'},
//     }}>
//     <TopTab.Screen name="Giới thiệu" component={StoryScreen} />
//     <TopTab.Screen name="D.S Chương" component={Account} />
//   </TopTab.Navigator>
// );
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////--------------------tOP-MENU---------------------//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////-------------------BOTTOM-MENU--------------------//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BottomNavigator = () => {
  return (
    <bottomTab.Navigator
      initialRouteName="Truyện Của Bạn"
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: '#262626'},

        tabBarIcon: ({focused, color}) => {
          let iconName = '';
          if (route.name === 'Truyện Của Bạn') {
            iconName = focused ? 'book-open-variant' : 'book-multiple';
          
          } else if (route.name === 'Chi Tiết') {
            iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted';
          } else if (route.name === 'Tài Khoản') {
            iconName = focused ? 'account-box' : 'account-box-outline';
          }
          return <Icon name={iconName} size={25} color={color} />;
        },

        tabBarActiveTintColor: 'white',
      })}>
      <bottomTab.Screen
        name="Truyện Của Bạn"
        component={StorageScreen}
        options={{
          headerTitle: 'Truyện Đã Xuất Bản',
          headerStyle: {backgroundColor: '#262626'},
          headerTintColor: '#fff',
        }}
      />
<bottomTab.Screen
        name="Chi Tiết"
        component={StorageScreen}
        options={{
          headerTitle: 'Thông Tin Chi Tiết',
          headerStyle: {backgroundColor: '#262626'},
          headerTintColor: '#fff',
        }}
      />
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
