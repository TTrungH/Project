import {useEffect, useState} from 'react';
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

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Introduction = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.IntroductionTop}>
        <Text style={styles.Chapter}>615</Text>
        <Text style={{color: 'grey', textAlign: 'center'}}>Chương</Text>
      </View>
      <Text style={styles.IntroductionContent}>ádasdsad</Text>
    </ScrollView>
  );
};

const Chapter = ({navigation}) => {
  const [data, setData] = useState([
    {
      chapter: '1',
      name: '10000',
    },
    {
      chapter: '2',
      name: '20000',
    },
    {
      chapter: '3',
      name: '30000',
    },
    {
      chapter: '4',
      name: '40000',
    },
    {
      chapter: '5',
      name: '50000',
    },
  ]);
  return (
    
      <FlatList
        data={data}
        keyExtractor={item => item.chapter}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.chapterContainer} onPress={() => navigation.navigate('Read')}>
              <Text style={styles.chapterList} >
                Chương {item.chapter}: {item.name}
              </Text>
              <View style={styles.ButtonSide}>
              <TouchableOpacity>
                <Icon name='note-edit'/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name='trash-can'/>
              </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
   
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

const Story = ({navigation}) => {
//   const [flag, SetFlag] = useState(false);
//   const [mark, SetMark] = useState('');
//   const [content, SetContent] = useState('');
  let title = 'Mê Vụ Thế Giới Đại Lãnh Chúa';
  let category = 'Võng du';
//   function Mark(newflag) { 
//     SetFlag(newflag);
//     if (newflag) {
//       SetMark('-');
//       SetContent('Xóa khỏi \nTủ truyện');
//     } else {
//       SetMark('+');
//       SetContent('Thêm vào \nTủ truyện');
//     }
//   }
//   useEffect(() => {
//     Mark(flag);
//   }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrow}>
          <Icon name="arrow-left" size={25} color="white" />
        </TouchableOpacity>
        <View style={styles.story}>
          <Image source={require('./img/1.jpg')} style={styles.avatar} />
          <View style={styles.contentSide}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.content}>{title}</Text>
            <Text style={{color: 'white'}}>Đánh giá: 4.5 </Text>
            <View style={styles.readButtonSide}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}>
                <Text style={styles.mark}>+</Text>
                <Text style={styles.contentMark}>Thêm Chương Mới</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Image
          source={require('./img/1.jpg')}
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
    flexDirection:'row',
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
    fontWeight:'bold',
    paddingHorizontal: 6,
    alignItems: 'center',
    color: 'white',
    fontSize: 13,
  },
});
