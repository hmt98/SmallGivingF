import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  AsyncStorage,
  Alert,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loading from '../loading/myIsLoading';
import heart from '../../images/heart.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
import updateInfor from '../api/updateInfor';
import updateInforWay4 from '../way4/updateinfor';

export default class account_info extends Component {
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
      name: '',
      pass: '',
      ngaysinh: '',
      sdt: '',
      sdtW4: '',
      email: '',
      stk: '',
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
      .catch((error) => {
        this.onFailNetWork();
      });

    getUserByID(id)
      .then((resPass) => resPass['MatKhau'])
      .then((resJSON) => {
        this.setState({pass: resJSON});
      })
      .catch((error) => console.log(error));

    getUserByID(id)
      .then((resSDT) => resSDT['SDT'])
      .then((resJSON) => {
        this.setState({sdt: resJSON});
      })
      .catch((error) => console.log(error));

    getUserByID(id)
      .then((resEmail) => resEmail['Email'])
      .then((resJSON) => {
        this.setState({email: resJSON});
      })
      .catch((error) => console.log(error));

    getUserByID(id)
      .then((resDate) => resDate['NgaySinh'])
      .then((resJSON) => {
        this.setState({ngaysinh: resJSON});
      })
      .catch((error) => console.log(error));

    getUserByID(id)
      .then((resSTK) => resSTK['STK'])
      .then((resJSON) => {
        this.setState({stk: resJSON});
      })
      .catch((error) => console.log(error));
  }

  boqua() {
    this.getdata();
  }

  onSuccessW4() {
    const {sdt, name} = this.state;
    updateInforWay4(sdt, name)
      .then((res) => res['message'])
      .then((result) => {
        console.log(result);
        if (result === 'success') return this.onSuccess();
        else this.onFail();
      })
      .catch((error) => {
        this.onFailNetWork();
      });
  }
  onSuccess() {
    this.setState({isLoading: false});
    Alert.alert('Cập nhật thành công!');
    this.getdata();
  }
  onFail() {
    this.setState({isLoading: false});
    Alert.alert('Error!', 'Thông tin bạn điền không hợp lệ!');
  }

  onFailNetWork() {
    Alert.alert('Có lỗi xảy ra! Vui lòng thử lại');
    this.setState({isLoading: false});
  }
  update() {
    const {id, name, pass, ngaysinh, stk} = this.state;
    this.setState({isLoading: true});
    updateInfor(id, name, pass, ngaysinh, stk)
      .then((res) => res['message'])
      .then((result) => {
        console.log(result);
        if (result === 'Success') return this.onSuccessW4();
        else this.onFail();
      })
      .catch(() => {
        this.onFailNetWork();
      });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground source={heart} style={styles.imgHeart}>
            <View style={[{flex: 8}]} />
            <View style={[{flex: 2}]}>
              <View style={styles.profile}>
                <View style={styles.profileName}>
                  <TextInput
                    style={styles.profileNameInput}
                    ref={(view) => (this.textInput_name = view)}
                    onChangeText={(text) => this.setState({name: text})}
                    value={this.state.name}
                  />
                </View>
                <View style={styles.btnEditProfile}>
                  <TouchableOpacity
                    onPress={() => this.textInput_name.focus()}
                    style={styles.img}>
                    <Icon
                      name="pencil-square-o"
                      size={wp('5%')}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={20}
          style={styles.main}>
          <View style={styles.mainRow}>
            <View style={styles.name}>
              <Text style={styles.txtNameCol}>SĐT</Text>
            </View>
            <View style={styles.nameInput}>
              <Text style={[{fontSize: f(1.8)}]}>{this.state.sdt}</Text>
            </View>
            <View style={styles.btnEdit} />
          </View>
          <View style={styles.mainRow}>
            <View style={styles.name}>
              <Text style={styles.txtNameCol}>Email</Text>
            </View>
            <View style={styles.nameInput}>
              <Text style={[{fontSize: f(1.8)}]}>
                {this.state.email}*********
              </Text>
            </View>
            <View style={styles.btnEdit} />
          </View>
          <View style={styles.mainRow}>
            <View style={styles.name}>
              <Text style={styles.txtNameCol}>Ngày sinh</Text>
            </View>
            <View style={styles.nameInput}>
              <TextInput
                style={[{fontSize: f(1.8)}]}
                ref={(view) => (this.textInput_date = view)}
                onChangeText={(text) => this.setState({ngaysinh: text})}
                value={this.state.ngaysinh}
              />
            </View>
            <View style={styles.btnEdit}>
              <TouchableOpacity onPress={() => this.textInput_date.focus()}>
                <Icon name="pencil-square-o" size={wp('5%')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainRow}>
            <View style={styles.name}>
              <Text style={styles.txtNameCol}>STK</Text>
            </View>
            <View style={styles.nameInput}>
              <TextInput
                style={[{fontSize: f(1.8)}]}
                ref={(view) => (this.textInput_stk = view)}
                onChangeText={(text) => this.setState({stk: text})}
                value={this.state.stk}
              />
            </View>
            <View style={styles.btnEdit}>
              <TouchableOpacity onPress={() => this.textInput_stk.focus()}>
                <Icon name="pencil-square-o" size={wp('5%')} />
              </TouchableOpacity>
            </View>
          </View>
          <Loading show={this.state.isLoading} />
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => this.boqua()}
            style={styles.btnBoqua}>
            <Text style={styles.txtBtn}>Bỏ qua</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.update.bind(this)}
            style={styles.btnCapnhat}>
            <Text style={styles.txtBtn}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
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
    flex: 4,
  },
  main: {
    flex: 3,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgHeart: {
    width: wp('100%'),
    height: hp('42%'),
  },
  mainRow: {
    flexDirection: 'row',
    height: hp('6.8%'),
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  name: {
    flex: 3,
    marginLeft: '1%',
  },
  nameInput: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnEdit: {
    flex: 1,
  },
  profile: {
    flexDirection: 'row',
    backgroundColor: '#AE1E17',
    height: hp('7%'),
    width: wp('70%'),
    alignSelf: 'center',
    borderRadius: 10,
  },
  profileName: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEditProfile: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileNameInput: {
    color: 'white',
    fontSize: f(2.5),
  },
  btnBoqua: {
    height: hp('7%'),
    width: wp('30%'),
    backgroundColor: '#AE1E17',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: '10%',
  },
  btnCapnhat: {
    height: hp('7%'),
    width: wp('30%'),
    backgroundColor: '#AE1E17',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: '10%',
  },
  txtBtn: {
    color: 'white',
    fontSize: f(2.2),
  },
  txtNameCol: {
    fontWeight: 'bold',
    fontSize: f(1.8),
  },
});
