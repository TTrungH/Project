import axios from 'axios';

export const login = async (username, password) => {
  console.log(password);
  
  try {
    const response = await axios({
      mode: 'cors',
      method: 'post',
      url: 'http://192.168.0.100:8880/v1/api/user/auth/login',
        // url: 'https://kami-backend-5rs0.onrender.com/auth',

      maxBodyLength: Infinity,
      data: {
        username: username,
        password: password,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
