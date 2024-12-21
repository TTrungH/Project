import {View, Text, FlatList,TouchableOpacity,Image,Alert} from 'react-native';
import {useState} from 'react';
import axios from 'axios';
import {StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomerList = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactions, setTransactions] = useState([]);

const handleDelete = () => {
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
          // onPress: deleteData,
          style: 'destructive',
        },
      ],
    );
  };
  const deleteData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      if (token !== null && id !== null) {
        deletedata(token, id);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const deletedata = (token, id) => {
    axios
      .delete(
        'https://kami-backend-5rs0.onrender.com/Customers/' + id,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log('Response:', response.data);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };




const [data, setData] = useState([
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '1.jpg'
    },
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '2.jpg'
    },
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '3.jpg'
    },
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '4.jpg'
    },
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '5.jpg'
    },
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '6.jpg'
    },
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '7.jpg'
    },
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '8.jpg'
    },
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '9.jpg'
    },
    {
      title: 'Mê Vụ Thế Giới Đại Lãnh Chúa',
      img: '10.jpg'
    },
  ]);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.transactionDetailContainer}>
        <Text style={styles.transactionDetailTitle}>Thông Tin Tài Khoản</Text>
        <View style={styles.TransactionDetailInf}>
          <View>
            <Text style={styles.transactionDetail}>
              Name <Text>{name}</Text>
            </Text>
            <Text style={styles.transactionDetail}>
              Phone <Text>{phone}</Text>
            </Text>
            <Text style={styles.transactionDetail}>
              Total spent <Text>{totalSpent}</Text>
            </Text>
            <Text style={styles.transactionDetail}>Time </Text>
            <Text style={styles.transactionDetail}>Last update </Text>
          </View>
        </View>
      </View>
      <View style={styles.transactionDetailContainer}>
        <Text style={styles.transactionDetailTitle}>Truyện Đã Đăng</Text>
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          scrollEnabled={true}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.story}
                onPress={() => navigation.navigate('AuthorStory')}>
                <Image
                  source={{uri: 'http://10.60.2.9:8080/' + item.img}}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.content} numberOfLines={2}>
                    {item.title} toi khong biet day là gi a a a a a a a a a a a
                    a
                  </Text>
                 
                  <TouchableOpacity
                    style={styles.Deletebutton}
                    onPress={handleDelete}>
                    <Icon name="trash-can-outline" color="red" size={18} />
                    <Text style={styles.text}>Loại Bỏ Truyện</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default CustomerList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  detailContainer: {
    flex: 1,
    padding: 5,
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
  transactionDetailContainer: {
    backgroundColor: '#262626',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  story: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginVertical: 5,
  },
  transactionDetailTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  TransactionDetailInf: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  transactionDetail: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 12,
  },
  TransactionDetailPrice: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  TransactionDetailTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F4',
  },
});
