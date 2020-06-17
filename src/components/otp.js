import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../../images/logo.png';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import getUserByToken from '../api/getUserByToken';
import changepass from '../api/changepass';
import Loading from '../loading/myIsLoading';
export default class otp extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Entypo
            name="chevron-left"
            color="#ffffff"
            size={f(3)}
            style={{paddingLeft: 10}}
          />
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      matkhaucu: '',
      matkhaumoi: '',
      matkhaumoiRe: '',
      hindPassOld: true,
      hindPassNewRe: true,
      hindPassNew: true,
      isLoading: false,
    };
  }
  componentDidMount = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    getUserByToken(tokenAsync)
      .then((resID) => resID['idNguoiDung'])
      .then((resJSON) => {
        this.setState({id: resJSON});
      })
      .catch((error) => {
        this.onFailNetWork();
      });
  };
  showPassOld() {
    this.setState({hindPassOld: !this.state.hindPassOld});
  }
  showPassNew() {
    this.setState({hindPassNew: !this.state.hindPassNew});
  }
  showPassNewRe() {
    this.setState({hindPassNewRe: !this.state.hindPassNewRe});
  }

  change() {
    const {id, matkhaucu, matkhaumoi, matkhaumoiRe} = this.state;
    if (matkhaucu === '' || matkhaumoi === '' || matkhaumoiRe === '') {
      Alert.alert('Error!', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (matkhaucu === matkhaumoi) {
      Alert.alert('Error!', 'Mật khẩu không thay đổi!');
      return;
    }
    if (matkhaumoi.length < 6) {
      Alert.alert('Error!', 'Mật khẩu phải có độ dài từ 6 kí tự!');
      return;
    }
    if (matkhaumoi !== matkhaumoiRe) {
      Alert.alert('Error!', 'Mật khẩu không trùng khớp!');
      return;
    }
    this.setState({isLoading: true});
    changepass(id, matkhaucu, matkhaumoi)
      .then((res) => res['message'])
      .then((result) => {
        if (result === 'Success') return this.onSuccess();
        else this.onFail();
      })
      .catch((error) => {
        this.onFailNetWork();
      });
  }
  onSuccess() {
    this.setState({isLoading: false});
    Alert.alert('Thay đổi mật khẩu thành công!');
    this.setState({matkhaucu: ''});
    this.setState({matkhaumoi: ''});
    this.setState({matkhaumoiRe: ''});
  }

  onFail() {
    Alert.alert('Error!', 'Mật khẩu không chính xác!');
    this.setState({isLoading: false});
  }
  onFailNetWork() {
    Alert.alert('Có lỗi xảy ra! Vui lòng thử lại!');
    this.setState({isLoading: false});
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image source={logo} style={styles.imgLogo} />
          </View>
          <View style={styles.logo}>
            <Text style={styles.txtHeader}>Small Giving</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.xacnhan}>
            <Text style={styles.txtXacnhan}>Xác nhận thay đổi mật khẩu</Text>
          </View>
          <View style={styles.xacnhan}>
            <Text style={styles.txtEmailSdt}>Bạn cần nhập đúng mật khẩu</Text>
            <Text style={styles.txtEmailSdt}>đã đăng ký</Text>
          </View>
          <ImageBackground style={styles.textInputPass}>
            <TextInput
              style={styles.textInputInPass}
              placeholder={'Nhập mật khẩu cũ'}
              onChangeText={(text) => this.setState({matkhaucu: text})}
              value={this.state.matkhaucu}
              secureTextEntry={this.state.hindPassOld}
            />
            <TouchableOpacity
              style={styles.showPass}
              onPress={this.showPassOld.bind(this)}>
              <Feather
                name={this.state.hindPassOld ? 'eye' : 'eye-off'}
                size={wp('5%')}
              />
            </TouchableOpacity>
          </ImageBackground>
          <ImageBackground style={styles.textInputPass}>
            <TextInput
              style={styles.textInputInPass}
              placeholder={'Nhập mật khẩu mới'}
              onChangeText={(text) => this.setState({matkhaumoi: text})}
              value={this.state.matkhaumoi}
              secureTextEntry={this.state.hindPassNew}
            />
            <TouchableOpacity
              style={styles.showPass}
              onPress={this.showPassNew.bind(this)}>
              <Feather
                name={this.state.hindPassNew ? 'eye' : 'eye-off'}
                size={wp('5%')}
              />
            </TouchableOpacity>
          </ImageBackground>
          <ImageBackground style={styles.textInputPass}>
            <TextInput
              style={styles.textInputInPass}
              placeholder={'Nhập lại mật khẩu mới'}
              onChangeText={(text) => this.setState({matkhaumoiRe: text})}
              value={this.state.matkhaumoiRe}
              secureTextEntry={this.state.hindPassNewRe}
            />
            <TouchableOpacity
              style={styles.showPass}
              onPress={this.showPassNewRe.bind(this)}>
              <Feather
                name={this.state.hindPassNewRe ? 'eye' : 'eye-off'}
                size={wp('5%')}
              />
            </TouchableOpacity>
          </ImageBackground>
          <Loading show={this.state.isLoading} />
        </View>
        <View style={styles.footer}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.change.bind(this)}
              style={styles.buttonIn}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  ktra = async () => {
    if (this.state.ma === '') {
      Alert.alert('Error!', 'Bạn chưa nhập mã!');
    } else {
      this.props.navigation.navigate('Reset_pass');
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    flexDirection: 'row',
  },
  logo: {
    margin: '1%',
  },
  imgLogo: {
    width: wp('40%'),
    height: hp('25%'),
  },
  txtHeader: {
    fontSize: f(4.0),
    color: '#CD0606',
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIn: {
    height: hp('7%'),
    width: wp('35%'),
    backgroundColor: '#AE1F17',
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: f(2.5),
  },
  txtXacnhan: {
    fontSize: f(2.5),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  txtEmailSdt: {
    fontSize: f(2.2),
  },
  xacnhan: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
  },
  textInputPass: {
    height: hp('6%'),
    width: wp('90%'),
    borderColor: '#545454',
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    margin: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  textInputInPass: {
    fontSize: f(2),
    padding: 5,
    flex: 9,
    justifyContent: 'center',
  },
  showPass: {
    flex: 1,
    justifyContent: 'center',
  },
});
