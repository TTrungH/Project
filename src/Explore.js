import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';

const ExploreScreen = ({navigation}) => {
  const [data, setData] = useState([
    {id: require('./img/1.jpg'), stt: '1', name: 'name1'},
    {id: require('./img/2.jpg'), stt: '2', name: 'name2'},
    {id: require('./img/3.jpg'), stt: '3', name: 'name3'},
    {id: require('./img/4.jpg'), stt: '4', name: 'name4'},
    {id: require('./img/5.jpg'), stt: '5', name: 'name5'},
    {id: require('./img/6.jpg'), stt: '6', name: 'name6'},
    {id: require('./img/7.jpg'), stt: '7', name: 'name7'},
    {id: require('./img/8.jpg'), stt: '8', name: 'name8'},
    {id: require('./img/9.jpg'), stt: '9', name: 'name9'},
    {id: require('./img/10.jpg'), stt: '10', name: 'name10'},
  ]);

  const limitedData = data.slice(0, 6); // Giới hạn danh sách chỉ hiển thị 3 phần tử đầu tiên

  const [avatar, setAvatar] = useState(require('./img/1.jpg'));
  const [title, setTitle] = useState('Suong mu the gioi dai lanh chua');
  const [catagory, setCatagory] = useState('Đồng nhân');
  const [intro, setIntro] = useState(
    'ahdkashdkjashdkjadhjasdhkjashaksjdhjashdkjashjkasdasdadsa',
  );

  return (
    <ScrollView style={styles.container}>



      
      <View>
        <TouchableOpacity
          style={styles.news}
          onPress={() => navigation.navigate('Story')}>
          <Text style={styles.section}>TRUYỆN MỚI</Text>
          <Icon name="chevron-right" size={25} style={styles.goback} />
        </TouchableOpacity>
        <FlatList
          data={data}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.stt.toString()}
          // numColumns={3}

          renderItem={({item}) => {
            return (
              <TouchableOpacity>
                <Image source={item.id} style={styles.avatar} />
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity
          style={styles.news}
          onPress={() => navigation.navigate('Story')}>
          <View style={styles.newsContent}>
            <Text style={styles.catagory}>{catagory}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.intro} numberOfLines={2}>
              {intro}
            </Text>
            <Text style={styles.rate}>Rate: {title}</Text>
          </View>
          <Image source={avatar} style={styles.newsAvatar} />
        </TouchableOpacity>
      </View>
      
      


      <View>
        <TouchableOpacity
          style={styles.news}
          onPress={() => navigation.navigate('Story')}>
          <Text style={styles.section}>TRUYỆN MỚI</Text>
          <Icon name="chevron-right" size={25} style={styles.goback} />
        </TouchableOpacity>
        <FlatList
          data={limitedData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.stt.toString()}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.eachSection}>
                <Image source={item.id} style={styles.avatarSpe} />
                <Text style={styles.title} numberOfLines={2}>
                  {title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      
      


      <View>
        <TouchableOpacity
          style={styles.news}
          onPress={() => navigation.navigate('Story')}>
          <Text style={styles.section}>TRUYỆN MỚI RA</Text>
          <Icon name="chevron-right" size={25} style={styles.goback} />
        </TouchableOpacity>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.stt.toString()}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.ListContainer}>
                <Image source={item.id} style={styles.avatarSpe} />
                <Text style={styles.title} numberOfLines={2}>
                  {title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>





      <View>
        <TouchableOpacity
          style={styles.news}
          onPress={() => navigation.navigate('Story')}>
          <Text style={styles.section}>TRUYỆN HOÀN THÀNH</Text>
          <Icon name="chevron-right" size={25} style={styles.goback} />
        </TouchableOpacity>
        <FlatList
          data={limitedData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.stt.toString()}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.eachSection}>
                <Image source={item.id} style={styles.avatarSpe} />
                <Text style={styles.title} numberOfLines={2}>
                  {title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>


    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2F2F2F',
  },
  story: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  ListContainer: {
    marginBottom: 20,
    alignItems: 'center',
    width: 110
  },
  avatar: {
    width: 55,
    height: 80,
    borderRadius: 6,
    marginRight: 15,
  },
  avatarSpe: {
    width: 98,
    height: 130,
    borderRadius: 6,
  },
  content: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  news: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsContent: {
    width: '55%',
    color: 'white',
  },
  newsAvatar: {
    width: '35%',
    height: 160,
    borderRadius: 10,
  },
  goback: {
    color: 'white',
  },
  section: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eachSection: {
    width: '31%',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  catagory: {
    color: 'grey',
  },
  title: {
    color: 'white',
    fontSize: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  titleNews: {
    color: 'white',
    fontSize: 15,
    marginVertical: 5,
  },
  intro: {
    color: 'grey',
    marginVertical: 5,
  },
  rate: {
    color: 'grey',
    marginVertical: 5,
  },
});
