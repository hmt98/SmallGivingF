import React, {Component} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import getNotice from '../api/getNotice';
import Notice_items from './notice_items';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import getUserByToken from '../api/getUserByToken';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
const DATA = [
  {
    id: '1',
    Result: 'Chưa có thông báo',
  },
];
export default class notice extends Component {
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
      refreshing: false,
      noticeFromServer: [],
      noticeError: false,
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
        Alert.alert('Error!', 'Có lỗi xảy ra! Vui lòng thử lại!');
      });
  };

  componentDidUpdate(preProps, preState, a) {
    const {id} = this.state;
    if (preState.id !== id) {
      this.getdata();
    }
  }
  getdata = () => {
    this.setState({refreshing: true});
    const {id} = this.state;
    getNotice(id)
      .then((res) => res['message'])
      .then((result) => {
        if (result === 'No post found') {
          this.setState({noticeError: true, refreshing: false});
        } else {
          this.setState({noticeError: false});
          getNotice(id)
            .then((notice) => {
              this.setState({noticeFromServer: notice, refreshing: false});
            })
            .catch((error) => {
              this.setState({noticeFromServer: [], refreshing: false});
            });
        }
      });
  };
  onRefresh = () => {
    this.getdata();
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.noticeError ? (
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
            data={this.state.noticeFromServer}
            renderItem={({item, index}) => <Notice_items item={item} />}
            keyExtractor={(item, index) => item.idThongBao}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
