import React from 'react';
import NormalUser from './src/NormalUser';
import Register from './src/RegisterAccount';
import Admin from './src/Admin';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/Login';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
            name="Register"
            component={Register}
            options={{header: () => null}}
          />
        <Stack.Screen
          name="NormalUser"
          component={NormalUser}
          options={{header: () => null}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{header: () => null}}
        />

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
