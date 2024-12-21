import 'react-native-gesture-handler';
import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import axios from 'axios';
const StorageScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const handleDelete = id => {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned.',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: () => deleteData(id),
          style: 'destructive',
        },
      ],
    );
  };
  const deleteData = async id => {
    try {
      deletedata(id);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const deletedata = id => {
    axios
      .delete('http://192.168.0.100:8880/v1/api/book/delete/' + id)
      .then(response => {
        console.log('Response:', response.data);
        fetchdata();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  useFocusEffect(
    useCallback(() => {
      axios
        .get('http://10.60.2.9:8880/v1/api/book/')
        .then(response => {
          setData(response.data.result);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []),
  );
  const fetchdata = () => {
    axios
      .get('http://10.60.2.9:8880/v1/api/book/')
      .then(response => {
        console.log('Response:', response.data.result);
        setData(response.data.result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButtonOther}
        onPress={() =>
          navigation.navigate('InputNewStory', {
            type: 'add',
            id: '',
            url: '',
            name: '',
            category: '',
            intro: '',
          })
        }>
        <Text style={styles.addButtonTextOther}>+</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.story}
              onPress={() =>
                navigation.navigate('AuthorStory', {
                  total: item.totalChapter,
                  id: item.id,
                  url: item.imageUrl,
                  name: item.name,
                  category: item.category,
                  intro: item.description,
                })
              }>
              <Image
                source={{uri: 'http://10.60.2.9:8080/' + item.imageUrl}}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.content} numberOfLines={2}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  style={styles.Editbutton}
                  onPress={() =>
                    navigation.navigate('InputNewStory', {
                      type: 'edit',
                      id: item.id,
                      url: item.imageUrl,
                      name: item.name,
                      category: item.category,
                      intro: item.description,
                    })
                  }>
                  <Icon name="note-edit-outline" color="blue" size={18} />
                  <Text style={styles.text}>Chỉnh Sửa Truyện</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Deletebutton}
                  onPress={() => handleDelete(item.id)}>
                  <Icon name="trash-can-outline" color="red" size={18} />
                  <Text style={styles.text}>Loại Bỏ Truyện</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default StorageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#2F2F2F',
  },
  addButtonOther: {
    backgroundColor: 'white',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  addButtonTextOther: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2F2F2F',
  },
  Editbutton: {
    width: 150,
    marginVertical: 2,
    paddingVertical: 3,
    paddingHorizontal: 7,
    flexDirection: 'row',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
  },
  Deletebutton: {
    width: 150,
    marginVertical: 2,
    paddingVertical: 3,
    paddingHorizontal: 7,
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    color: 'grey',
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  story: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginVertical: 5,
  },

  avatar: {
    height: 100,
    borderRadius: 6,
    marginRight: 15,
    width: '22%',
  },
  content: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    width: 240,
  },
});
