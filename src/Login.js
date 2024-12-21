import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Text, TextInput} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleLogin = async e => {
    e.preventDefault();
    // Handle login logic here
    setLoading(true);
    console.log('Password:', password);
    let result = null;
    const apiUrl = await AsyncStorage.getItem('apiUrl');

    try {
      console.log('login:  ', username);

      result = await axios({
        mode: 'cors',
        method: 'post',
        url: `${apiUrl}/v1/api/user/auth/login`,
        // url: 'https://kami-backend-5rs0.onrender.com/auth',

        maxBodyLength: Infinity,
        data: {
          username: username,
          password: password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(result);
      const data = result.data;
      if (data) {
        if (data.message === 'login successfully') {
          setData(result.data);
        }else {
          Alert.alert("login fail");
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const storeURL = async () => {
    try {
      const hostname = '10.60.2.9';
      const port = '8880';
      return await AsyncStorage.setItem('apiUrl', `http://${hostname}:${port}`);
    } catch (e) {
      // read error
    }
  };

  useEffect(() => {
    storeURL();
  }, []);

  useEffect(() => {
    if (data) {
      setLoading(false);

      navigation.navigate('NormalUser', {data: data});
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Login
      </Text>

      <View style={styles.inputWrapper}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          secureTextEntry={!showPassword}
          left={
            <TextInput.Icon
              icon={showPassword ? 'eye' : 'eye-off'}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          }
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>create new account</Text>
      </TouchableOpacity>

      <Button
        icon="login-variant"
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        loading={loading}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    margin: 10,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});

export default Login;
