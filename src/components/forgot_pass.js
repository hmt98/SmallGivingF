import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import checkpass from '../api/checkpass';
import logo from '../../images/logo.png';
import Entypo from 'react-native-vector-icons/Entypo';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loading from '../loading/myIsLoading';
export default class forgot_pass extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
    this.state = {email: '', sdt: '', isLoading: false};
  }
  confirm() {
    const {email, sdt} = this.state;
    if (sdt === '' || email === '') {
      Alert.alert('Error!', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }
    this.setState({isLoading: true});
    checkpass(email, sdt)
      .then((res) => res['message'])
      .then((result) => {
        if (result === 'Tai khoan khong ton tai') {
          return this.onFail();
        } else {
          this.onSuccess(result);
        }
      })
      .catch((error) => {
        this.onFailNetWork();
      });
  }
  onSuccess(pass) {
    this.setState({isLoading: false});
    Alert.alert('Success!', 'Mật khẩu của bạn là: ' + pass);
    this.props.navigation.navigate('Login');
  }

  onFail() {
    this.setState({isLoading: true});
    Alert.alert('Error!', 'Email hoặc SĐT không đúng! Vui lòng kiểm tra lại!');
  }
  onFailNetWork() {
    Alert.alert('Có lỗi xảy ra! Vui lòng thử lại');
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
            <Text style={styles.txtXacnhan}>Xác nhận quên mật khẩu</Text>
          </View>
          <View style={styles.xacnhan}>
            <Text style={styles.txtEmailSdt}>
              Bạn cần nhập đúng Email và SĐT
            </Text>
            <Text style={styles.txtEmailSdt}>đã đăng ký</Text>
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputIn}
              placeholder={'Nhập số điện thoại'}
              onChangeText={(text) => this.setState({sdt: text})}
              value={this.state.sdt}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputIn}
              placeholder={'Nhập email'}
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
              keyboardType="email-address"
            />
          </View>
          <Loading show={this.state.isLoading} />
        </View>
        <View style={styles.footer}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.confirm.bind(this)}
              style={styles.buttonIn}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  ktra = async () => {
    if (this.state.email === '') {
      Alert.alert('Error!', 'Bạn chưa nhập email!');
    } else {
      this.props.navigation.navigate('OTP');
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
    flexDirection: 'column',
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
  textInput: {
    height: hp('6%'),
    width: wp('90%'),
    borderColor: '#545454',
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    paddingLeft: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textInputIn: {
    fontSize: f(2),
    padding: 5,
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
});
