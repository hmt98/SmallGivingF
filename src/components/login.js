import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import logo from '../../images/logo.png';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {startGetToken, loginSuccess, loginError} from '../redux/actionCreaters';
import getTokenEmail from '../api/getTokenEmail';
import getTokenSDT from '../api/getTokenSDT';
var {width, height} = Dimensions.get('window');
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loading from '../loading/myIsLoading';
class login extends Component {
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
    this.state = {
      username: '',
      password: '',
      name: '',
      hindPass: true,
      isLoading: false,
    };
  }

  componentWillReceiveProps = async (nextProps) => {
    //kiểm tra xem có kết nối mạng chưa
    if (nextProps.myError) {
      this.setState({isLoading: false});
      Alert.alert('Error!', 'Vui lòng kiểm tra kết nối mạng!');
      return;
    }
    //kiểm tra xem thông tin đăng nhập đúng chưa
    if (nextProps.myToken === 'error') {
      Alert.alert('Error!', 'Thông tin đăng nhập không chính xác!');
      this.setState({isLoading: false});
      return;
    }
    if (nextProps.myToken !== 'error' && nextProps.myToken !== null) {
      await AsyncStorage.setItem('tokenLogin', nextProps.myToken);
      Alert.alert('Đăng nhập thành công!');
      this.props.navigation.navigate('Main');
      this.setState({isLoading: false});
    }
  };

  getLoginStatus() {
    const {myUserName, myError, myPassWord, myToken} = this.props;
    if (myError) return `Vui lòng kiểm tra lại kết nối mạng!`;
    else return `${myUserName},${myPassWord} là ${myToken} `;
  }

  login = async () => {
    const {username, password} = this.state;
    //kiểm tra xem điền thông tin đăng nhập chưa
    if (username === '' || password === '') {
      Alert.alert('Error!', 'Vui lòng điền thông tin đăng nhập!');
      return;
    }
    this.props.startGetToken();
    this.setState({isLoading: true});
    if (username.includes('@')) {
      getTokenEmail(username, password)
        .then((res) =>
          this.props.loginSuccess(username, password, res['token']),
        )
        .catch(() => this.props.loginError());
    } else {
      getTokenSDT(username, password)
        .then((res) =>
          this.props.loginSuccess(username, password, res['token']),
        )
        .catch(() => this.props.loginError());
    }
  };

  showPass() {
    this.setState({hindPass: !this.state.hindPass});
  }

  forgotPass() {
    this.props.navigation.navigate('Forgot_pass');
  }
  render(item) {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.main}>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputIn}
              placeholder={'Nhập Email hoặc SĐT'}
              onChangeText={(text) => this.setState({username: text})}
              value={this.state.username}
              keyboardType="email-address"
            />
          </View>
          <ImageBackground style={styles.textInputPass}>
            <TextInput
              style={styles.textInputInPass}
              placeholder={'Nhập mật khẩu'}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={this.state.hindPass}
            />
            <TouchableOpacity
              style={styles.showPass}
              onPress={this.showPass.bind(this)}>
              <Feather
                name={this.state.hindPass ? 'eye' : 'eye-off'}
                size={wp('5%')}
              />
            </TouchableOpacity>
          </ImageBackground>
          <TouchableOpacity
            onPress={this.forgotPass.bind(this)}
            style={styles.forgotPass}>
            <Text style={styles.txtForgotPass}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <Loading show={this.state.isLoading} />
        </View>
        <View style={styles.footer}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.login.bind(this)}
              style={styles.buttonIn}>
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate('Signin');
              }}
              style={styles.buttonIn}>
              <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 2,
  },
  footer: {
    flex: 4,
  },
  logo: {
    width: wp('50%'),
    height: hp('30%'),
  },
  textInput: {
    height: hp('7%'),
    width: wp('85%'),
    borderColor: '#545454',
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: 'center',
    margin: 5,
    paddingLeft: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textInputPass: {
    height: hp('7%'),
    width: wp('85%'),
    borderColor: '#545454',
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: 'center',
    margin: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  textInputIn: {
    fontSize: f(2.5),
    justifyContent: 'center',
    padding: 5,
  },
  textInputInPass: {
    fontSize: f(2.5),
    padding: 5,
    flex: 9,
    justifyContent: 'center',
  },
  showPass: {
    flex: 1,
    justifyContent: 'center',
  },
  forgotPass: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtForgotPass: {
    fontSize: f(2.5),
    color: '#545454',
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
});

function mapStateToProps(state) {
  return {
    myUserName: state.username,
    myPassWord: state.password,
    myError: state.err,
    myToken: state.token,
  };
}
export default connect(mapStateToProps, {
  startGetToken,
  loginSuccess,
  loginError,
})(login);
