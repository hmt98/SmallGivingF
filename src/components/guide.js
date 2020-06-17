import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  RefreshControl,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';

import Anh from '../../images/canhan.png';
import Entypo from 'react-native-vector-icons/Entypo';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
export default class Guide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name: '',
      id: '',
      refreshing: false,
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
      .catch((error) => console.log(error));
  };

  componentDidUpdate(preProps, preState, a) {
    const {id} = this.state;
    if (preState.id !== id) {
      this.getdata();
    }
  }

  getdata() {
    this.setState({refreshing: true});
    const {id} = this.state;
    getUserByID(id)
      .then((resName) => resName['TenNguoiDung'])
      .then((resJSON) => {
        this.setState({name: resJSON});
      })
      .catch((error) => console.log(error));
    this.setState({refreshing: false});
  }
  onRefresh = () => {
    this.getdata();
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
        <View style={styles.header}>
          <Image style={styles.imgCaNhan} source={Anh} />
          <Text
            eclipSizeMode={'tail'}
            numberOfLines={1}
            allowFontScaling={false}
            style={styles.txtName}>
            {this.state.name}
          </Text>
        </View>
        <View style={styles.main}>
          <View style={styles.thank}>
            <Text style={styles.txtThank}>
              Cảm ơn bạn đã tin tưởng chúng tôi!
            </Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardInfor}>
              <View style={styles.colName}>
                <Text style={styles.txtColName}>Chủ thẻ:</Text>
              </View>
              <View style={styles.colValue}>
                <Text style={styles.txtColValue}>Đoàn TN HVNH </Text>
              </View>
            </View>
            <View style={styles.cardInfor}>
              <View style={styles.colName}>
                <Text style={styles.txtColName}>Số tài khoản:</Text>
              </View>
              <View style={styles.colValue}>
                <Text style={styles.txtColValue}>02475869999</Text>
              </View>
            </View>
            <View style={styles.cardInfor}>
              <View style={styles.colName}>
                <Text style={styles.txtColName}>Ngân hàng:</Text>
              </View>
              <View style={styles.colValue}>
                <Text style={styles.txtColValue}>Quân Đội - MB</Text>
              </View>
            </View>
          </View>
          <View style={styles.guide}>
            <View style={styles.thuchien}>
              <Text style={styles.txtThucHien}>Cách thực hiện</Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.txtStep}>
                Bước 1: Nhập số tài khoản phía trên
              </Text>
              <Text style={styles.txtStep}>
                Bước 2: Nhập nội dung chuyển khoản là SĐT đăng ký
              </Text>
              <Text style={styles.txtStep}>
                Bước 3: Chuyển khoản và chờ kết quả
              </Text>
            </View>
          </View>
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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 6,
  },
  imgCaNhan: {
    height: hp('20%'),
    width: wp('30%'),
  },
  txtName: {
    fontSize: f(2.3),
    color: '#545454',
    fontWeight: 'bold',
    margin: '1%',
  },
  txtInfor: {
    fontSize: f(2),
    color: '#545454',
    margin: '1%',
  },
  thank: {
    height: hp('7%'),
    width: wp('100%'),
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#545454',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtThank: {
    color: '#AE1E17',
    fontWeight: 'bold',
    fontSize: f(2.3),
  },
  cardInfor: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '2%',
    marginLeft: '15%',
  },
  colName: {
    flex: 4,
    justifyContent: 'center',
  },
  colValue: {
    flex: 6,
    justifyContent: 'center',
  },
  txtColName: {
    color: '#545454',
    fontWeight: 'bold',
    fontSize: f(2),
  },
  txtColValue: {
    color: '#AE1E17',
    fontSize: f(2),
  },
  card: {
    borderBottomWidth: 2,
    borderColor: '#545454',
  },
  thuchien: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtThucHien: {
    fontSize: f(3.5),
    color: '#545454',
  },
  step: {
    marginLeft: '3%',
  },
  txtStep: {
    color: '#545454',
    fontSize: f(2.2),
    fontWeight: 'bold',
    margin: '1%',
  },
});
