import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
var {width, height} = Dimensions.get('window');
import avatar from '../../images/loa.png';
export default class Notice_items extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Image source={avatar} style={styles.imgAvatar} />
          </View>
          <View style={styles.tieude}>
            <Text
              style={styles.tentin}
              eclipSizeMode={'tail'}
              numberOfLines={1}
              allowFontScaling={false}>
              {item.TieuDeThongBao}
            </Text>
            <Text style={styles.ngaygio}> {item.ThoiGian}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.mainWidth}>
            <Text
              style={styles.noidung}
              eclipSizeMode={'tail'}
              numberOfLines={1}
              allowFontScaling={false}>
              {item.NoiDung}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#545454',
  },
  header: {
    flex: 2,
    flexDirection: 'row',
  },
  main: {
    flex: 3,
  },
  footer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tieude: {
    flex: 8,
    justifyContent: 'center',
  },
  imgAvatar: {
    height: hp('4%'),
    width: wp('8%'),
  },
  tentin: {
    fontWeight: 'bold',
    marginTop: '2%',
    color: '#545454',
    textTransform: 'uppercase',
    fontSize: f(1.7),
  },
  ngaygio: {
    fontSize: f(1.7),
  },
  mainWidth: {
    width: wp('96%'),
    alignSelf: 'center',
  },
  noidung: {
    textAlign: 'justify',
    fontSize: f(1.8),
  },
});
