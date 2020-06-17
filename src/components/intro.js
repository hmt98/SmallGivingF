import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../../images/logo.png';
import {connect} from 'react-redux';
var {width, height} = Dimensions.get('window');
class intro extends Component {
  checkToken = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    if (tokenAsync === null) {
      this.props.navigation.navigate('Login');
      return;
    }
    if (tokenAsync !== null) this.props.navigation.navigate('Main');
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.imgLogo} />
        </View>
        <View style={styles.main}>
          <Text style={styles.txtLogo}>Small Giving</Text>
          <Text style={styles.txtSlogan}>small giving - big meaning</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.sloganVn}>
            <Text style={styles.txtSloganVn}>Việc làm nhỏ - Ý nghĩa lớn</Text>
            <Text style={styles.txtSloganVn}>
              Cùng chung tay giúp những hoàn cảnh khó khăn
            </Text>
          </View>
          <View style={styles.sloganVn}>
            <TouchableOpacity
              onPress={() => {
                this.checkToken();
              }}
              style={styles.btnTieptuc}>
              <Text style={styles.txtBtn}>Tiếp tục</Text>
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
    alignItems: 'stretch',
    backgroundColor: '#AE1F17',
  },
  header: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    width: f(30),
    height: f(33),
  },
  main: {
    flex: 2,
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    flexDirection: 'column',
  },
  txtLogo: {
    color: 'white',
    fontSize: f(6),
  },
  txtSlogan: {
    color: 'white',
    fontSize: f(3),
  },
  txtSloganVn: {
    fontSize: f(2),
    color: 'white',
  },
  sloganVn: {
    alignItems: 'center',
    flex: 5,
  },
  btnTieptuc: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: hp('7%'),
    width: '70%',
  },
  txtBtn: {
    fontSize: f(3.5),
  },
});
function mapStateToProps(state) {
  return {
    myToken: state.token,
  };
}
export default connect(mapStateToProps)(intro);
