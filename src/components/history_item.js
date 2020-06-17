import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
var {width, height} = Dimensions.get('window');
export default class History_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tienvao: false,
    };
  }
  render() {
    const item = this.props.item;
    if (item.TrangThai === 'Tien ra') {
      this.state.tienvao = false;
    }
    if (item.TrangThai === 'Tien vao') {
      this.state.tienvao = true;
    }
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.ngaychuyen}>
            <Text style={styles.txtNgaychuyen}>{item.Ngaychuyen}</Text>
          </View>
          <View style={styles.tengiaodich}>
            <Text style={styles.txtTengiaodich}>{item.TenGiaoDich}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text
            style={[
              {color: this.state.tienvao ? 'green' : 'red'},
              {fontSize: f(2)},
            ]}>
            {this.state.tienvao ? '+ ' : '- '}
            {item.TransAmount}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#545454',
    height: hp('7%'),
    flexDirection: 'row',
  },
  ngaychuyen: {
    margin: '1%',
  },
  tengiaodich: {
    margin: '1%',
  },
  txtNgaychuyen: {
    fontSize: f(1.8),
    color: '#545454',
  },
  txtTengiaodich: {
    fontSize: f(2),
  },
  left: {
    flex: 5,
    margin: '1%',
  },
  right: {
    flex: 5,
    justifyContent: 'center',
  },
});
