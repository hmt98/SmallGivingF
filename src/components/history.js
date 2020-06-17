import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  AsyncStorage,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import getHistory from '../way4/getHistory';
import getUserByToken from '../api/getUserByToken';
import History_Item from './history_item';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../loading/myIsLoading';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-datepicker';
const DATA = [
  {
    id: '1',
    Result: 'Không có bản ghi nào',
  },
];
export default class history extends Component {
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
      refreshing: false,
      historyFromServer: [],
      historyError: false,
      sdt: '',
      ngayBD: '',
      ngayKT: '',
      isLoading: false,
    };
  }
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
  };
  componentDidUpdate(preProps, preState, a) {
    const {sdt} = this.state;
    if (preState.sdt !== sdt) {
      this.getdataA();
    }
  }
  getdata() {
    const {sdt, ngayBD, ngayKT} = this.state;
    if (ngayBD.length === 0) {
      Alert.alert('Error!', 'Vui lòng chọn ngày bắt đầu!');
      return;
    }
    if (ngayKT.length === 0) {
      Alert.alert('Error!', 'Vui lòng chọn ngày kết thúc!');
      return;
    }
    this.setState({isLoading: true});
    getHistory(sdt, ngayBD, ngayKT)
      .then((res) => res['message'])
      .then((result) => {
        if (result === 'No post found') {
          this.setState({
            historyError: true,
            refreshing: false,
            isLoading: false,
          });
        } else {
          this.setState({historyError: false});
          getHistory(sdt, ngayBD, ngayKT)
            .then((history) => {
              this.setState({
                historyFromServer: history,
                refreshing: false,
                isLoading: false,
              });
            })
            .catch((error) => {
              this.setState({
                historyFromServer: [],
                refreshing: false,
                isLoading: false,
              });
            });
        }
      })
      .catch((error) => console.log(error));
  }

  getdataA() {
    const {sdt, ngayBD, ngayKT} = this.state;
    this.setState({isLoading: true});
    getHistory(sdt, ngayBD, ngayKT)
      .then((res) => res['message'])
      .then((result) => {
        if (result === 'No post found') {
          this.setState({
            historyError: true,
            refreshing: false,
            isLoading: false,
          });
        } else {
          this.setState({historyError: false});
          getHistory(sdt, ngayBD, ngayKT)
            .then((history) => {
              this.setState({
                historyFromServer: history,
                refreshing: false,
                isLoading: false,
              });
            })
            .catch((error) => {
              this.setState({
                historyFromServer: [],
                refreshing: false,
                isLoading: false,
              });
            });
        }
      })
      .catch((error) => console.log(error));
  }
  onRefresh = () => {
    this.getdata();
  };
  onFailNetWork() {
    Alert.alert('Có lỗi xảy ra! Vui lòng thử lại!');
    this.setState({isLoading: false});
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.condition}>
            <View style={styles.BD}>
              <View style={styles.lblBD}>
                <Text style={styles.txtBD}>Từ ngày</Text>
              </View>
              <View style={styles.ipBD}>
                <DatePicker
                  placeholder={'Chọn ngày'}
                  format="DD-MM-YYYY"
                  minDate="2020-01-01"
                  date={this.state.ngayBD}
                  onDateChange={(date) => {
                    this.setState({ngayBD: date});
                  }}
                />
              </View>
            </View>
            <View style={styles.KT}>
              <View style={styles.lblKT}>
                <Text style={styles.txtKT}>Đến ngày</Text>
              </View>
              <View style={styles.ipKT}>
                <DatePicker
                  placeholder={'Chọn ngày'}
                  format="DD-MM-YYYY"
                  minDate="2020-01-01"
                  date={this.state.ngayKT}
                  onDateChange={(date) => {
                    this.setState({ngayKT: date});
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonAll}>
            <TouchableOpacity
              onPress={this.getdata.bind(this)}
              style={styles.btnAll}>
              <Text style={styles.txtBtnTienvao}>Truy vấn lịch sử</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main}>
          {this.state.isLoading ? (
            <Loading show={this.state.isLoading} />
          ) : this.state.historyError ? (
            <FlatList
              data={DATA}
              renderItem={({item}) => (
                <View style={styles.bxhError}>
                  <Text style={styles.txtBxhError}>{item.Result}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            />
          ) : (
            <FlatList
              data={this.state.historyFromServer}
              renderItem={({item, index}) => <History_Item item={item} />}
              keyExtractor={(item, index) => item.idLichSu}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            />
          )}
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
    flex: 1.7,
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 2,
  },
  main: {
    flex: 8,
    // backgroundColor: 'red',
  },
  condition: {
    flexDirection: 'row',
    marginTop: 20,
  },
  BD: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  KT: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  lblBD: {
    marginRight: 5,
  },
  textInputBD: {
    fontSize: f(1.5),
    padding: '3%',
  },
  txtBD: {
    fontSize: f(1.5),
  },
  lblKT: {
    marginRight: 5,
  },
  textInputKT: {
    fontSize: f(1.5),
    padding: '3%',
  },
  txtKT: {
    fontSize: f(1.5),
  },
  buttonAll: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAll: {
    backgroundColor: '#AE1F17',
    height: hp(4),
    width: wp(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: f(2),
  },
  txtBtnTienvao: {
    color: 'white',
  },
  DS: {
    margin: 5,
  },
  bxhError: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  txtBxhError: {
    fontSize: f(2),
    color: '#AE1F17',
    fontWeight: 'bold',
  },
});
