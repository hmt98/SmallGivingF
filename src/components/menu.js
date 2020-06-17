import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import Anh from '../../images/canhan.png';
import Entypo from 'react-native-vector-icons/Entypo';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
export default class menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token: '', name: '', id: ''};
  }

  logout = async () => {
    this.setState({token: null});
    await AsyncStorage.setItem('tokenLogin', this.state.token);
    this.props.navigation.navigate('Intro');
  };

  componentDidMount = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    getUserByToken(tokenAsync)
      .then((resID) => resID['idNguoiDung'])
      .then((resJSON) => {
        this.setState({id: resJSON});
      })
      .catch((error) => console.log(error));
  };

  componentDidUpdate(preProps, preState, a) {
    const {id} = this.state;
    if (preState.id !== id) {
      this.getdata();
    }
  }

  getdata() {
    const {id} = this.state;
    getUserByID(id)
      .then((resName) => resName['TenNguoiDung'])
      .then((resJSON) => {
        this.setState({name: resJSON});
      })
      .catch((error) => console.log(error));
  }

  home() {
    this.getdata();
    this.props.navigation.closeDrawer();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={Anh} style={styles.imgCanhan} />
          <Text
            eclipSizeMode={'tail'}
            numberOfLines={1}
            allowFontScaling={false}
            style={styles.txtCanhan}>
            {this.state.name}
          </Text>
        </View>
        <View style={styles.main}>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={this.home.bind(this)}
              style={styles.btnAll}>
              <Entypo name={'home'} size={wp('8%')} style={styles.imgBtn} />
              <Text style={styles.txtBtn}>Trang chủ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Contact');
              }}
              style={styles.btnAll}>
              <Entypo name={'phone'} size={wp('8%')} style={styles.imgBtn} />
              <Text style={styles.txtBtn}>Liên hệ và góp ý</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Guide');
              }}
              style={styles.btnAll}>
              <Entypo
                name={'text-document'}
                size={wp('8%')}
                style={styles.imgBtn}
              />
              <Text style={styles.txtBtn}>Hướng dẫn nạp tiền</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => {
                this.logout();
              }}
              style={styles.btnAll}>
              <Entypo name={'log-out'} size={wp('8%')} style={styles.imgBtn} />
              <Text style={styles.txtBtn}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 3,
    borderBottomColor: '#545454',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 5,
  },
  footer: {
    flex: 2,
  },
  imgCanhan: {
    height: hp('20%'),
    width: wp('30%'),
  },
  txtCanhan: {
    fontSize: f(2.8),
  },
  btnAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: hp('3%'),
  },
  imgBtn: {
    flex: 2,
    marginLeft: '10%',
  },
  txtBtn: {
    flex: 8,
    marginLeft: wp('2%'),
    fontSize: f(2.5),
  },
});
