import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import {Button, Icon, Text, TextInput} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [flag, setFlag] = useState(true);

  const check = (pass, conf) => {
    console.log(pass, conf);

    if (pass !== conf) {
      Alert.alert(
        'Warning',
        'Password was not matched',
      );
      return false;
    } else {
      return true;
    }
  };
  const handleLogin = async e => {
    if (!check(password, confirm)) {
      return;
    }

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
        url: `${apiUrl}/v1/api/user/register`,
        // url: 'https://kami-backend-5rs0.onrender.com/auth',

        maxBodyLength: Infinity,
        data: {
          username: username,
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(result.data);
      const data = result.data;
      if (
        data.message &&
        data.message === 'A user was created successfully'
      ) {
        setData(data);
        Alert.alert('User created successfully');
      } else if (data.message) {
        setFlag(false);
        if (data.message === 'user contained') {
          Alert.alert('User contained');
        }else {
            Alert.alert('wrong input');
        }
      }
    } catch (error) {
    //   console.error('Error:', error);
    Alert.alert('missing fields');
      setLoading(false);
    }
  };

  //   const storeURL = async () => {
  //     try {
  //       const hostname = '10.60.2.9';
  //       const port = '8880';
  //       return await AsyncStorage.setItem('apiUrl', `http://${hostname}:${port}`);
  //     } catch (e) {
  //       // read error
  //     }
  //   };

  //   useEffect(() => {
  //     storeURL();
  //   }, []);

  useEffect(() => {
    if (data) {
      setLoading(false);

      navigation.navigate('Login');
    }
  }, [data]);

  useEffect(() => {
      setLoading(false);
  }, [flag]);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Register
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
      <View style={styles.inputWrapper}>
        <TextInput
          label="Confirm Password"
          value={confirm}
          onChangeText={text => setConfirm(text)}
          mode="outlined"
          secureTextEntry={!showConfirmPassword}
          left={
            <TextInput.Icon
              icon={showConfirmPassword ? 'eye' : 'eye-off'}
              onPress={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
            />
          }
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
          left={
            <TextInput.Icon
              icon={'email'}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          }
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          mode="outlined"
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          mode="outlined"
        />
      </View>

      <Button
        icon="login-variant"
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        loading={loading}>
        Register
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
