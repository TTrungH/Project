import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Input = ({route}) => {
  const {type, id, name, category, intro,url} = route.params;
  const navigation = useNavigation();
  const [Url, setUrl] = useState(url);
  const [Name, setName] = useState(name);
  const [Category, setCategory] = useState(category);
  const [Intro, setIntro] = useState(intro);

  const adddata = async (type, id, name, description, category, url) => {
    const postData = {
      name: name,
      category: category,
      description: description,
      imageUrl: url,
    };

    try {
      if (type === 'add') {
        add(postData)
      } else if (type ==='edit') {
        change(postData, id)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const add = data => {
    console.log(data);

    axios
      .post('http://10.60.2.9:8880/v1/api/book/add', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Response:', response.data);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const change = (data, id) => {
    axios
      .put('http://10.60.2.9:8880/v1/api/book/update/' + id, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Response:', response.data);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error:', error);
        
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.label}>URL Hình Ảnh</Text>
        <TextInput
          style={styles.text}
          multiline={true}
          value={Url}
          onChangeText={text => setUrl(text)}></TextInput>
        <Text style={styles.label}>Tên Truyện</Text>
        <TextInput
          style={styles.text}
          multiline={true}
          value={Name}
          onChangeText={text => setName(text)}></TextInput>
        <Text style={styles.label}>Thể Loại</Text>
        <TextInput
          style={styles.text}
          multiline={true}
          value={Category}
          onChangeText={text => setCategory(text)}></TextInput>
        <Text style={styles.label}>Giới Thiệu</Text>
        <TextInput
          style={styles.text}
          multiline={true}
          value={Intro}
          onChangeText={text => setIntro(text)}></TextInput>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => adddata(type, id, Name, Intro, Category, Url)}>
        <Text style={styles.textButton}>Đăng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: 'white',
    width: '90%',
    paddingVertical: 5,
    marginHorizontal: 15,
    borderRadius: 7,
    marginVertical: 15,
  },
  textButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 7,
  },
  label: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});
