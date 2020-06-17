import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  AsyncStorage,
  Animated,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import coin from '../../images/coin.png';
const {width, height} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import quyengop from '../api/quyengop';
import getmoney from '../way4/getmoney';
import quyengopW4 from '../way4/donate';
import Loading from '../loading/myIsLoading';
export default class news_details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: new Animated.Value(width),
      id: '',
      sdt: '',
      sodu: '',
      sotien: null,
      soduHD: '',
      isLoading: false,
    };
  }
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
  _goAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: width - width,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };
  _backAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: width,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };
  componentDidMount = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    getUserByToken(tokenAsync)
      .then((resSDT) => resSDT['SDT'])
      .then((resJSON) => {
        this.setState({sdt: resJSON});
      })
      .catch((error) => {
        this.onFailNetWork();
      });
    getUserByToken(tokenAsync)
      .then((resID) => resID['idNguoiDung'])
      .then((resJSON) => {
        this.setState({id: resJSON});
      })
      .catch((error) => {
        this.onFailNetWork();
      });
  };

  componentDidUpdate(preProps, preState, a) {
    const {sdt, id} = this.state;
    if (preState.sdt !== sdt) {
      this.getdata();
    }
    if (preState.id !== id) {
      this.getdataTD();
    }
  }

  getdataTD() {
    const item = this.props.navigation.state.params.item;
    const {id} = this.state;
  }

  getdata() {
    const item = this.props.navigation.state.params.item;
    const {sdt} = this.state;
    getmoney(sdt)
      .then((resSodu) => resSodu['Available'])
      .then((resJSON) => {
        this.setState({sodu: resJSON});
      })
      .catch((error) => {
        this.onFailNetWork();
      });
    getmoney(item.idHoatDong)
      .then((resSoduHD) => resSoduHD['Available'])
      .then((resJSON) => {
        this.setState({soduHD: resJSON});
      })
      .catch((error) => {
        this.onFailNetWork();
      });
  }

  quyengopAnimate() {
    const item = this.props.navigation.state.params.item;
    if ((item.ChiDK - item.SoDuTK) * 1 <= 0) {
      Alert.alert(
        'Notice!',
        'Đã đạt số tiền dự kiến! Vui lòng sang hoạt động khác!',
      );
      return;
    }
    this.getdata();
    this._goAnimation();
  }
  quyengop() {
    const {id, sodu, sotien} = this.state;
    if (sotien === null) {
      Alert.alert('Error!', 'Vui lòng nhập số tiền!');
      return;
    } else if (sotien * 1 < 5000) {
      Alert.alert('Error!', 'Số tiền tối thiểu là 5000 VNĐ!');
      return;
    } else if ((sotien - sodu) * 1 <= 0) {
      this.setState({isLoading: true});
      this.donate();
      return;
    } else {
      Alert.alert('Error!', 'Số tiền không hợp lệ!');
      return;
    }
  }
  onSuccess() {
    const {sdt, sotien} = this.state;
    const item = this.props.navigation.state.params.item;
    quyengopW4(sdt, item.idHoatDong, sotien)
      .then((res) => res['message'])
      .then((result) => {
        if (result === 'success') return this.onSuccessW4();
        else this.onFailW4();
      })
      .catch((error) => {
        Alert.alert('Error!', 'Có lỗi xảy ra! Vui lòng thử lại');
      });
  }
  onSuccessW4() {
    Alert.alert('Quyên góp thành công!', 'Cảm ơn tấm lòng hảo tâm của bạn!');
    this.setState({isLoading: false, sotien: null});
  }
  onFail() {
    this.setState({isLoading: false});
    Alert.alert('Error!', 'Có lỗi xảy ra! Vui lòng thử lại');
  }
  onFailW4() {
    this.setState({isLoading: false});
    Alert.alert('Error!', 'Có lỗi xảy ra! Vui lòng thử lại');
  }
  onFailNetWork() {
    Alert.alert('Có lỗi xảy ra! Vui lòng thử lại!');
    this.setState({isLoading: false});
  }
  donate() {
    const {id, sotien} = this.state;
    const item = this.props.navigation.state.params.item;
    quyengop(id, item.idHoatDong, sotien)
      .then((res) => res['message'])
      .then((result) => {
        if (result === 'success') return this.onSuccess();
        else this.onFail();
      })
      .catch((error) => {
        Alert.alert('Error!', 'Có lỗi xảy ra! Vui lòng thử lại!');
      });
  }
  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.imgSuKien} source={{uri: item.Anh}} />
        </View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={20}
          style={styles.main}>
          <View style={styles.tenHoatDong}>
            <Text
              eclipSizeMode={'tail'}
              numberOfLines={1}
              allowFontScaling={false}
              style={styles.txtTenHoatDong}>
              {item.TenHoatDong}
            </Text>
          </View>
          <View style={styles.noidungHoatDong}>
            <ScrollView style={styles.scroll}>
              <Text style={styles.txtNoiDungHoatDong}>{item.NoiDung}</Text>
            </ScrollView>
            <View style={styles.btnQuyenGopView}>
              <TouchableOpacity
                onPress={() => {
                  this.quyengopAnimate();
                  this.textInput_money.focus();
                }}
                style={styles.btnQuyenGopOut}>
                <Text style={styles.txtBtnQuyenGopOut}>Quyên góp</Text>
              </TouchableOpacity>
            </View>
            <Animatable.View
              style={styles.animateView}
              left={this.state.xValue}>
              <View style={styles.exit}>
                <View style={styles.exitLeft} />
                <View style={styles.exitRight}>
                  <TouchableOpacity onPress={this._backAnimation}>
                    <AntDesign color={'#AE1F17'} name="close" size={wp('5%')} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.coin}>
                <Image source={coin} style={styles.imgCoin} />
              </View>
              <View style={styles.tien}>
                <Text style={styles.txtSotienhientai}>
                  Số tiền hiện tại bạn có là:
                </Text>
                <Text style={styles.txtSotien}>{this.state.sodu} VNĐ</Text>
                <TextInput
                  ref={(view) => (this.textInput_money = view)}
                  style={styles.ipTien}
                  onChangeText={(text) => this.setState({sotien: text})}
                  value={this.state.sotien}
                  placeholder="Nhập số tiền..."
                  keyboardType="default"
                />
                <View style={styles.btnQuyenGopView}>
                  <TouchableOpacity
                    onPress={this.quyengop.bind(this)}
                    style={styles.btnQuyenGopOut}>
                    <Text style={styles.txtBtnQuyenGopOut}>Quyên góp</Text>
                  </TouchableOpacity>
                  <Loading show={this.state.isLoading} />
                </View>
              </View>
            </Animatable.View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 5,
  },
  imgSuKien: {
    width: wp('95%'),
    height: hp('36%'),
    borderRadius: 10,
    marginTop: '2%',
  },
  tenHoatDong: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
  },
  txtTenHoatDong: {
    fontSize: f(2.5),
    color: '#AE1F17',
    fontWeight: 'bold',
  },
  noidungHoatDong: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtNoiDungHoatDong: {
    fontSize: f(2.2),
    textAlign: 'justify',
  },
  scroll: {
    height: hp('28%'),
    width: wp('95%'),
  },
  btnQuyenGopOut: {
    height: hp('7%'),
    width: wp('40%'),
    backgroundColor: '#AE1F17',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtBtnQuyenGopOut: {
    color: 'white',
    fontSize: f(2.2),
  },
  animateView: {
    height: hp('50%'),
    width: wp('100%'),
    backgroundColor: 'white',
    position: 'absolute',
  },
  coin: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCoin: {
    width: f(10),
    height: f(10),
  },
  exit: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  exitLeft: {
    flex: 9,
  },
  exitRight: {
    flex: 1,
  },
  tien: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSotienhientai: {
    fontSize: f(2.5),
  },
  txtSotien: {
    color: '#AE1F17',
    fontSize: f(2.5),
  },
  ipTien: {
    height: hp('7%'),
    width: wp('45%'),
    borderColor: '#AE1F17',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: f(2.2),
    paddingLeft: '3%',
  },
  btnQuyenGopView: {
    marginTop: '5%',
  },
});
