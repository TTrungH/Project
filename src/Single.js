import {useEffect, useState,useCallback} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();



const Story = ({navigation,route}) => {
  const [flag, SetFlag] = useState(false);
  const [mark, SetMark] = useState('');
  const [content, SetContent] = useState('');
  function Mark(newflag) {
    SetFlag(newflag);
    if (newflag) {
      SetMark('-');
      SetContent('Xóa khỏi \nTủ truyện');
    } else {
      SetMark('+');
      SetContent('Thêm vào \nTủ truyện');
    }
  }
  useEffect(() => {
    Mark(flag);
  }, []);

  const {id, url, name, category, intro, total} = route.params;

  const [data, setData] = useState([]);

  const fetchdata = id => {
    axios
      .get('http://10.60.2.9:8880/v1/api/chapter/' + id)
      .then(response => {
        setData(response.data.result[0].Chapters);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  useFocusEffect(
    useCallback(() => {
      axios
        .get('http://10.60.2.9:8880/v1/api/chapter/' + id)
        .then(response => {
          setData(response.data.result[0].Chapters);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []),
  );
  useEffect(() => {
    fetchdata(id);
  }, []);

  const Introduction = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.IntroductionTop}>
          <Text style={styles.Chapter}>{total}</Text>
          <Text style={{color: 'grey', textAlign: 'center'}}>Chương</Text>
        </View>
        <Text style={styles.IntroductionContent}>{intro}</Text>
      </ScrollView>
    );
  };

  const Chapter = ({navigation}) => {
    
    return (
      <View style={{flex: 1, backgroundColor: '#262626'}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.chapterContainer} onPress={() => navigation.navigate('Read', {
                id:item.id,
                name: item.name,
                content: item.content,
                order: item.orderNumber,
              })}>
                <Text style={styles.chapterList} >
                  Chương {item.chapter}: {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
     </View>
    );
  };
  
  const TopStorage = ({navigation}) => (
    <TopTab.Navigator
      style={{flex: 1}}
      initialRouteName="Giới thiệu"
      screenOptions={{
        tabBarStyle: {backgroundColor: '#262626'},
        tabBarIndicatorStyle: {backgroundColor: 'white'},
        tabBarLabelStyle: {color: 'white'},
      }}>
      <TopTab.Screen name="Giới thiệu" component={Introduction} />
      <TopTab.Screen name="D.S Chương" component={Chapter} />
    </TopTab.Navigator>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrow}>
          <Icon name="arrow-left" size={25} color="white" />
        </TouchableOpacity>
        <View style={styles.story}>
          <Image source={{uri:'http://10.60.2.9:8080/'+ url}} style={styles.avatar} />
          <View style={styles.contentSide}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.content}>{name}</Text>
            <Text style={{color: 'white'}}>Đánh giá: 4.5</Text>
            <View style={styles.readButtonSide}>
              <TouchableOpacity onPress={()=> navigation.navigate('Read', {
                    name: item.name,
                    content: item.content,
                    order: item.orderNumber,
                  })}>
                <Text style={styles.readButton}>Đọc truyện</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Mark(!flag)}
                style={{flexDirection: 'row'}}>
                <Text style={styles.mark}>{mark}</Text>
                <Text style={styles.contentMark}>{content}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Image
          source={{uri:'http://10.60.2.9:8080/'+ url}}
          style={styles.overlay}
          resizeMode="cover"
          blurRadius={10}
        />
      </View>
      <TopStorage />
    </View>
  );
};
export default Story;
const styles = StyleSheet.create({
  header: {
    flexWrap: 'nowrap',
  },
  Chapter: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  IntroductionTop: {
    backgroundColor: '#2F2F2F',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  IntroductionContent: {
    color: 'white',
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  arrow: {
    zIndex: 1000,
    paddingVertical: 15,
    paddingLeft: 15,
  },
  category: {
    fontSize: 12,
    color: 'white',
    backgroundColor: 'blue',
    textAlign: 'center',
    width: '35%',
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  chapterContainer: {
    flex: 1,
    backgroundColor: '#262626',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  chapterList: {
    color: 'white',
    fontSize: 15,
  },
  story: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    zIndex: 1000,
    paddingBottom: 18,
  },
  avatar: {
    width: 100,
    height: 150,
    borderRadius: 6,
    marginRight: 15,
  },
  contentSide: {
    width: '65%',
  },
  content: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  readButton: {
    backgroundColor: 'blue',
    alignContent: 'stretch',
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 1,
  },
  readButtonSide: {
    position: 'absolute',
    top: 120,
    flexDirection: 'row',
  },
  mark: {
    borderRadius: 12,
    backgroundColor: 'white',
    textAlign: 'center',
    width: 22,
    alignItems: 'center',
    fontSize: 15,
    marginLeft: 10,
  },
  contentMark: {
   
    paddingHorizontal: 6,
    alignItems: 'center',
    color: 'white',
    fontSize: 8,
  },
});
