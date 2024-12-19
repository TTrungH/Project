import {Image, Text, View,TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Header = ({navigation}) => {
  function Back(){
    navigation.navigate('Story');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={() => Back()}>
        <Icon name="chevron-right" size={25} color="white" />
      </TouchableOpacity>

      <Image source={require('./img/1.jpg')} /> 
      <Text>ấdasdasdsa</Text>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2F2F2F',
  },
});
