import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const Input = ({route}) => {
  const navigation = useNavigation();
  const {type, id, name, content} = route.params;
  const [data, setData] = useState('asdasdas');
  const [Name, setName] = useState(name);
  const [Content, setContent] = useState(content);
  const adddata = async (type, id, name, content) => {
    const postData = {
      name: name,
      truyenId: id,
      content: content,
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

    axios
      .post('http://10.60.2.9:8880/v1/api/chapter/add', data, {
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
      .put('http://10.60.2.9:8880/v1/api/chapter/update/3/6' + id, data, {
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
        <Text style={styles.label}>Tiêu Đề</Text>
        <TextInput
          style={styles.text}
          multiline={true}
          value={Name}
          onChangeText={text => setName(text)}></TextInput>
        <Text style={styles.label}>Nội dung</Text>
        <TextInput
          style={styles.text}
          multiline={true}
          value={Content}
          onChangeText={text => setContent(text)}></TextInput>
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>adddata(type,id,Name,Content)}>
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
