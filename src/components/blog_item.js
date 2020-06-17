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
var {width, height} = Dimensions.get('window');
import avatar from '../../images/canhan.png';
export default class Item_blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readfull: false,
    };
  }

  readfull = () => {
    this.setState({readfull: !this.state.readfull});
  };

  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
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
              {item.TenTin}
            </Text>
            <Text style={styles.ngaygio}> {item.ThoiGian}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.mainWidth}>
            <Text
              style={styles.noidung}
              eclipSizeMode={'tail'}
              numberOfLines={this.state.readfull ? null : 2}
              allowFontScaling={false}>
              {item.NoiDung}
            </Text>
            <TouchableOpacity onPress={this.readfull}>
              <Text style={styles.xemthem}>
                {this.state.readfull ? 'Rút gọn' : 'Xem thêm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Image source={{uri: item.Anh}} style={styles.anh} />
        </View>
      </View>
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
    height: hp('10%'),
    width: wp('20%'),
  },
  tentin: {
    fontWeight: 'bold',
    marginTop: '2%',
    color: '#545454',
    textTransform: 'uppercase',
    fontSize: f(2),
  },
  ngaygio: {
    fontSize: f(1.8),
  },
  mainWidth: {
    width: wp('96%'),
    alignSelf: 'center',
  },
  noidung: {
    textAlign: 'justify',
    fontSize: f(1.8),
  },
  anh: {
    height: hp('30%'),
    width: wp('95%'),
    alignSelf: 'center',
    margin: '2%',
  },
  xemthem: {
    fontWeight: 'bold',
    color: '#426ec7',
    fontSize: f(1.8),
  },
});
