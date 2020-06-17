import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  AsyncStorage,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
const {width, height} = Dimensions.get('window');
import Loading from '../loading/myIsLoading';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';

import contact from '../api/contact';
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noidung: '',
      name: '',
      id: '',
      refreshing: false,
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
    this.setState({refreshing: true, isLoading: true});
    const {id} = this.state;
    getUserByID(id)
      .then((resName) => resName['TenNguoiDung'])
      .then((resJSON) => {
        this.setState({name: resJSON, refreshing: false});
      })
      .catch((error) => {
        this.onFailNetWork();
      });
    this.setState({refreshing: false, isLoading: false});
  }

  onSuccess() {
    this.setState({isLoading: false});
    Alert.alert('Cảm ơn bạn đã góp ý!');
    this.setState({noidung: ''});
  }

  onFail() {
    this.setState({isLoading: false});
    Alert.alert('Error!', 'Có lỗi xảy ra, vui lòng thử lại!');
  }

  onRefresh = () => {
    this.getdata();
  };
  onFailNetWork() {
    Alert.alert('Có lỗi xảy ra! Vui lòng thử lại!');
    this.setState({isLoading: false});
  }
  gopy() {
    const {id, noidung} = this.state;
    if (noidung === '') {
      Alert.alert('Error!', 'Vui lòng nhập góp ý của bạn!');
      return;
    } else {
      this.setState({isLoading: true});
      contact(id, noidung)
        .then((res) => res['message'])
        .then((result) => {
          if (result === 'Success') return this.onSuccess();
          else this.onFail();
        })
        .catch((error) => {
          this.onFailNetWork();
        });
    }
  }

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
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.txtThank}>
              CẢM ƠN BẠN VÌ NHỮNG HÀNH ĐỘNG CAO ĐẸP!
            </Text>
            <Text style={styles.txtThacMac}>
              Mọi thắc mắc xin liên hệ và góp ý với chúng tôi!
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={20}
          style={styles.main}>
          <Text style={styles.txtGuiGopY}>Gửi góp ý của bạn</Text>
          <View style={styles.noiGopY}>
            <View style={styles.colName}>
              <Text style={styles.txtColName}>Họ và tên:</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.txtColValue}>{this.state.name}</Text>
            </View>
          </View>
          <View style={styles.noiGuiGopY}>
            <View style={styles.colNameGui}>
              <Text style={styles.txtColNameGui}>Góp ý của bạn:</Text>
            </View>
            <View style={styles.colValueGui}>
              <TextInput
                style={styles.inputGopY}
                multiline={true}
                onChangeText={(text) => this.setState({noidung: text})}
                value={this.state.noidung}
              />
            </View>
          </View>
          <Loading show={this.state.isLoading} />
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.gopy.bind(this)}
            style={styles.btnGuiGopY}>
            <Text style={styles.txtBtn}>Gửi góp ý</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 2,
  },
  headerTop: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  main: {
    flex: 5,
  },
  footer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtThank: {
    fontSize: f(2),
    fontWeight: 'bold',
    color: '#AE1E17',
  },
  txtThacMac: {
    fontSize: f(1.9),
    fontWeight: 'bold',
    color: '#AE1E17',
    marginTop: '2%',
  },
  txtGuiGopY: {
    alignSelf: 'center',
    fontSize: f(2.5),
    fontWeight: 'bold',
    margin: '5%',
  },
  noiGopY: {
    flexDirection: 'row',
    margin: '2%',
  },
  colName: {
    flex: 4,
  },
  txtColValue: {
    fontSize: f(2.3),
    fontWeight: 'bold',
  },
  colValue: {
    flex: 6,
    justifyContent: 'center',
  },
  txtColName: {
    fontSize: f(2.3),
  },
  txtColNameGui: {
    fontSize: f(2.3),
  },
  noiGuiGopY: {
    flexDirection: 'column',
    margin: '2%',
  },
  inputGopY: {
    alignSelf: 'center',
    height: hp('30%'),
    width: wp('95%'),
    borderColor: '#AE1E17',
    borderWidth: 2,
    borderRadius: 20,
    fontSize: f(2.3),
  },
  colValueGui: {
    marginTop: '3%',
  },
  btnGuiGopY: {
    height: hp('7%'),
    width: wp('45%'),
    backgroundColor: '#AE1E17',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtBtn: {
    color: 'white',
    fontSize: f(2.3),
  },
});
