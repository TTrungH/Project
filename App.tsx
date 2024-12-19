import React from 'react';
import NormalUser from './src/NormalUser';
import Author from './src/Author';
import Admin from './src/Admin';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();

const App = () => {
  return (
   
      <NavigationContainer>
        <Stack.Navigator initialRouteName="NormalUser">
          {/* <Stack.Screen
            name="Login"
            component={}
            options={{header: () => null}}
          /> */}
          <Stack.Screen
            name="NormalUser"
            component={NormalUser}
            options={{header: () => null}}
          />
          {/* <Stack.Screen
            name="Author"
            component={Author}
            options={{header: () => null}}
          /> */}
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={{header: () => null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
   
  );
};
export default App;
