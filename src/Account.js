import 'react-native-gesture-handler';
import React from 'react';
import {Text, View, ScrollView,TouchableOpacity, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StorageScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topAccount}>
        <Image source={require('./img/1.jpg')} style={styles.avatar} />
        <Text style={styles.name}>Trần Trung Hậu</Text>
      </View>
      <TouchableOpacity style={styles.object}>
        <Text style={styles.content}>Thông tin tài khoản</Text>
        <Icon name="chevron-right" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.object} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.content}>Quản lý tài khoản (admin)</Text>
        <Icon name="chevron-right" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.object}>
        <Text style={styles.content}>Đăng xuất</Text>
        <Icon name="chevron-right" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default StorageScreen;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////-------------------STYLE-sHEET--------------------//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2F2F2F',
  },
  object: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    paddingHorizontal: 12,
    borderBlockColor: 'grey',
    justifyContent: 'space-between',
  },
  topAccount: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    paddingTop: 15,
    paddingBottom: 30
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  content: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  name:{
    fontWeight: 'bold',
    fontSize: 26,
    color: 'white',
  }
});
