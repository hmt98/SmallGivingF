import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  AsyncStorage,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
var {width, height} = Dimensions.get('window');
import heart from '../../images/heart.png';
import canhan from '../../images/canhan.png';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
import getmoney from '../way4/getmoney';
export default class account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      sdt: '',
      sodu: '',
      refreshing: false,
    };
  }

  componentDidMount = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    getUserByToken(tokenAsync)
      .then((resSDT) => resSDT['SDT'])
      .then((resJSON) => {
        this.setState({sdt: resJSON});
      })
      .catch((error) => console.log(error));
  };

  componentDidUpdate(preProps, preState, a) {
    const {sdt} = this.state;
    if (preState.sdt !== sdt) {
      this.getData();
    }
  }

  getData = () => {
    this.setState({refreshing: true});
    const {sdt} = this.state;
    getmoney(sdt)
      .then((resAvai) => resAvai['Available'])
      .then((resJSON) => {
        this.setState({sodu: resJSON, refreshing: false});
      })
      .catch((error) => {
        this.setState({refreshing: false});
        console.log(error);
      });

    getmoney(sdt)
      .then((resAvai) => resAvai['ContractName'])
      .then((resJSON) => {
        this.setState({name: resJSON, refreshing: false});
      })
      .catch((error) => {
        this.setState({refreshing: false});
        console.log(error);
      });
  };

  onRefresh = () => {
    this.getData();
  };
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        style={styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
          <ImageBackground style={styles.imgNguoigia} source={heart}>
            <View style={styles.profile}>
              <Image style={styles.avata} source={canhan} />
              <ImageBackground style={styles.name}>
                <Text style={styles.nameIn}>{this.state.name}</Text>
              </ImageBackground>
            </View>
          </ImageBackground>
          <View style={styles.taikhoan}>
            <View style={styles.tongchi}>
              <Text style={styles.txtTaikhoan}>Tổng chi 5/2020</Text>
              <Text style={styles.txtTien}>500000</Text>
            </View>
            <View style={styles.sodu}>
              <Text style={styles.txtTaikhoan}>Số dư</Text>
              <Text style={styles.txtTien}>{this.state.sodu}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Account_info')}
            style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Entypo
                name={'v-card'}
                size={wp('8%')}
                style={styles.imgLogo}
                color={'#545454'}
              />
            </View>
            <View style={styles.ten}>
              <Text style={styles.giaodich}>Chỉnh sửa thông tin</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <FontAwesome5
                name={'medal'}
                size={wp('8%')}
                style={styles.imgLogo}
                color={'#545454'}
              />
            </View>
            <View style={styles.ten}>
              <Text style={styles.giaodich}>Xem huy hiệu</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History')}
            style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Entypo
                name={'back-in-time'}
                size={wp('8%')}
                style={styles.imgLogo}
                color={'#545454'}
              />
            </View>
            <View style={styles.ten}>
              <Text style={styles.giaodich}>Lịch sử giao dịch</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('OTP')}
            style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <MaterialIcons
                name={'security'}
                size={wp('8%')}
                style={styles.imgLogo}
                color={'#545454'}
              />
            </View>
            <View style={styles.ten}>
              <Text style={styles.giaodich}>Thay đổi mật khẩu</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  imgNguoigia: {
    height: hp('50%'),
    width: wp('100%'),
  },
  profile: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  avata: {
    height: hp('10%'),
    width: wp('20%'),
    marginTop: hp('40%'),
  },
  name: {
    backgroundColor: '#AE1E17',
    height: hp('7%'),
    width: wp('70%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: hp('42%'),
  },
  nameIn: {
    fontSize: f(2.5),
    color: 'white',
  },
  taikhoan: {
    flexDirection: 'row',
    height: hp('10%'),
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  tongchi: {
    flex: 5,
    alignItems: 'center',
  },
  txtTien: {
    fontSize: f(2.2),
    color: '#AE1E17',
  },
  sodu: {
    flex: 5,
    alignItems: 'center',
  },
  txtTaikhoan: {
    fontWeight: 'bold',
    color: '#545454',
    fontSize: f(2.2),
  },
  nguoidung: {
    flexDirection: 'row',
    height: hp('7%'),
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tennguoidung: {
    flex: 4,
  },
  ten: {
    flex: 5,
  },
  img: {
    flex: 3,
    alignItems: 'center',
  },
  imgLogo: {
    alignSelf: 'center',
  },
  giaodich: {
    fontSize: f(2.2),
    fontWeight: 'bold',
    color: '#545454',
  },
});
