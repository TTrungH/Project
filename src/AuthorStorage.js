import 'react-native-gesture-handler';
import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';

const StorageScreen = ({navigation}) => {
  let title = 'Mê Vụ Thế Giới Đại Lãnh Chúa';
  return (
    <ScrollView style={styles.container}>
      
      <TouchableOpacity style={styles.story} onPress={() => navigation.navigate('AuthorStory')}>
        <Image source={require('./img/1.jpg')} style={styles.avatar} />
        <Text style={styles.content}>{title} toi khong biet day là gi</Text>
        <Icon name='trash-can' style={styles.remove} size={15} />
      </TouchableOpacity>
      
    </ScrollView>
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
    paddingVertical: 8,
    
  },
  remove:{
    color:'red',
    width:'8%',
    marginTop: 5
  },
  avatar: {
   
    height: 100,
    borderRadius: 6,
    marginRight: 15,
    width:'22%',
  },
  content:{
    fontWeight:'bold',
    fontSize: 16,
    color: 'white',
    width:'69%',
  },
});
