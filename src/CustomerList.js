import {
    View,
    Text,
    FlatList,
  } from 'react-native';
  import {useState} from 'react';
  import axios from 'axios';
  import {StyleSheet,ScrollView,} from 'react-native';
  const CustomerList = ({route, navigation}) => {
    const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactions, setTransactions] = useState([]);
  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.transactionDetailContainer}>
        <Text style={styles.transactionDetailTitle}>General information</Text>
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
        <Text style={styles.transactionDetailTitle}>Transaction history</Text>
        <FlatList
          data={transactions}
          keyExtractor={item => item._id}
          scrollEnabled={true}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('')}
                style={styles.productContainer}>
                <Text style={styles.transactionId}>
                  {item.id} - {item.createdAt}
                  <FlatList
                    data={item.services}
                    scrollEnabled={false}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => {
                      return (
                        <Text
                          style={styles.transactionContent}
                          ellipsizeMode="tail"
                          numberOfLines={1}>
                          - {item.name}
                        </Text>
                      );
                    }}
                  />
                </Text>
                <Text style={styles.transactionPrice}>{item.price}đ</Text>
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
    detailContainer: {
        flex: 1,
        padding:5
      },
      transactionDetailContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        padding: 10,
      },
      transactionDetailTitle: {
        color: '#EF506B',
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
  