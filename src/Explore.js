import 'react-native-gesture-handler';
import React, {useState,useCallback,useEffect} from 'react';
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
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
const ExploreScreen = ({navigation}) => {
  const [data, setData] = useState([
    
  ]);
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
  const limitedData = data.slice(0, 6); // Giới hạn danh sách chỉ hiển thị 3 phần tử đầu tiên
const [id,setId] = useState('');
const [total,setTotal] = useState('');
  const [avatar, setAvatar] = useState('/1.jpg');
  const [title, setTitle] = useState('Suong mu the gioi dai lanh chua');
  const [category, setCatagory] = useState('Đồng nhân');
  const [intro, setIntro] = useState(
    'ahdkashdkjashdkjadhjasdhkjashaksjdhjashdkjashjkasdasdadsa',
  );
function changeFont(id,total,name,image,category,intro){
setId(id);
setTotal(total);
setAvatar(image);
setTitle(name);
setCatagory(category);
setIntro(intro)
}
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
          keyExtractor={item => item.id}
          // numColumns={3}

          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={()=>changeFont(item.id,item.totalChapter,item.name,item.imageUrl,item.category,item.description)}>
                <Image source={{uri:'http://10.60.2.9:8080/' + item.imageUrl}} style={styles.avatar} />
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity
          style={styles.news}
          onPress={() => navigation.navigate('Story',{
            total: total,
            id: id,
            url: avatar,
            name: title,
            category: category,
            intro: intro,
          })}>
          <View style={styles.newsContent}>
            <Text style={styles.catagory}>{category}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.intro} numberOfLines={2}>
              {intro}
            </Text>
            <Text style={styles.rate}>Rate: 5</Text>
          </View>
          <Image source={{uri:'http://10.60.2.9:8080/' + avatar}} style={styles.newsAvatar} />
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
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.eachSection} onPress={() => navigation.navigate('Story',{
                total: item.totalChapter,
                id: item.id,
                url: item.imageUrl,
                name: item.name,
                category: item.category,
                intro: item.description,
              })}>
                <Image source={{uri:'http://10.60.2.9:8080/' + item.imageUrl}} style={styles.avatarSpe} />
                <Text style={styles.title} numberOfLines={2}>
                  {item.name}
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
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.ListContainer} onPress={() => navigation.navigate('Story',{
                total: item.totalChapter,
                id: item.id,
                url: item.imageUrl,
                name: item.name,
                category: item.category,
                intro: item.description,
              })}>
                <Image source={{uri:'http://10.60.2.9:8080/' + item.imageUrl}} style={styles.avatarSpe} />
                <Text style={styles.title} numberOfLines={2}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>





      <View>
        <TouchableOpacity
          style={styles.news}
          >
          <Text style={styles.section}>TRUYỆN HOÀN THÀNH</Text>
          <Icon name="chevron-right" size={25} style={styles.goback} />
        </TouchableOpacity>
        <FlatList
          data={limitedData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.eachSection} onPress={() => navigation.navigate('Story',{
                total: item.totalChapter,
                id: item.id,
                url: item.imageUrl,
                name: item.name,
                category: item.category,
                intro: item.description,
              })}>
                <Image source={{uri:'http://10.60.2.9:8080/' + item.imageUrl}} style={styles.avatarSpe} />
                <Text style={styles.title} numberOfLines={2}>
                  {item.name}
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
