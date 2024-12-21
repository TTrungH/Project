import 'react-native-gesture-handler';
import React, {useEffect, useState,useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const StorageScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
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
          onPress: () =>deleteData(id),
          style: 'destructive',
        },
      ],
    );
  };
  const deleteData = async (id) => {
    try {
      deletedata( id);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const deletedata = ( id) => {
    axios
      .delete('http://10.60.2.9:8880/v1/api/book/delete/' + id)
      .then(response => {
        console.log('Response:', response.data);
        fetchdata();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

    const fetchdata = () => {
      axios
        .get(
          'http://10.60.2.9:8880/v1/api/book/' 
        )
        .then(response => {
          console.log('Response:', response.data.result);
          setData(response.data.result);
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
    useEffect(() => {
      fetchdata();
    }, []);
   

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      style={styles.container}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            style={styles.story}
            onPress={() => navigation.navigate('Story',{
              total: item.totalChapter,
              id: item.id,
              url: item.imageUrl,
              name: item.name,
              category: item.category,
              intro: item.description,
            })}>
            <Image  source={{uri: 'http://10.60.2.9:8080/' +item.imageUrl}} style={styles.avatar} />
            <Text style={styles.content}>
              {item.name}
            </Text>
            <Icon name="trash-can" style={styles.remove} size={15} onPress={()=>handleDelete(item.id)}/>
          </TouchableOpacity>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default StorageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2F2F2F',
  },
  story: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginVertical: 5,
  },
  remove: {
    color: 'red',
    width: '8%',
    marginTop: 5,
  },
  avatar: {
    height: 100,
    borderRadius: 6,
    marginRight: 15,
    width: 75,
    resizeMode: 'cover',
  },
  content: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    width: '69%',
  },
});
