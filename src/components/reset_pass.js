import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import logo from '../../images/logo.png';
import mail from '../../images/mail.png';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
var radio_props = [
  {label: 'Email        ', value: 0},
  {label: 'Số điện thoại', value: 1},
];
export default class reset_pass extends Component {
  constructor(props) {
    super(props);
    this.state = {newpass: '', newpass1: ''};
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.logoapp}>
            <Image style={styles.imgLogo} source={logo} />
            <Text style={styles.txtSmall}>Small Giving</Text>
          </View>
          <View style={styles.txtTitle}>
            <Text style={styles.txtXacnhan}>XÁC NHẬN MẬT KHẨU</Text>
            <Text style={styles.txtOtp}>Vui lòng nhập mật khẩu mới</Text>
          </View>
          <View style={styles.inputPass}>
            <TextInput
              style={styles.txitPass}
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor="#BAA8A8"
              keyboardType="email-address"
              onChangeText={newpass => this.setState({newpass})}
              value={this.state.newpass}
            />
            <TextInput
              style={styles.txitPass}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="#BAA8A8"
              keyboardType="email-address"
              onChangeText={newpass1 => this.setState({newpass1})}
              value={this.state.newpass1}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={this.ktra}
              style={styles.buttonContainer}>
              <Text style={styles.textButton}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate('OTP');
              }}
              style={styles.buttonContainerR}>
              <Text style={styles.textButtonR}>Quay lại</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image style={styles.imgMail} source={mail} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  ktra = async () => {
    if (this.state.newpass === '') {
      Alert.alert('Error!', 'Bạn chưa nhập mật khẩu mới!');
    } else if (this.state.newpass1 === '') {
      Alert.alert('Error!', 'Bạn chưa nhập lại mật khẩu!');
    } else {
      this.props.navigation.navigate('Login');
    }
  };
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  logoapp: {
    marginTop: 20,
    flexDirection: 'row',
  },
  txtSmall: {
    color: '#CD0606',
    fontSize: 35,
    marginTop: 35,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  imgLogo: {
    width: 100,
    height: 100,
    marginLeft: 50,
    marginTop: 10,
  },
  imgMail: {
    width: 145,
    height: 140,
    marginLeft: 140,
    marginTop: 10,
  },
  txtTitle: {
    marginTop: 20,
  },
  txtXacnhan: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtOtp: {
    fontSize: 16,
    textAlign: 'center',
    color: '#545454',
    marginTop: 10,
  },
  inputPass: {
    // flexDirection:'row',
    marginTop: 20,
    marginLeft: 30,
  },
  txitPass: {
    width: 350,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#545454',
    marginRight: 10,
    marginBottom: 10,
    fontSize: 18,
    paddingLeft: 10,
    padding: 5,
  },
  buttonContainer: {
    backgroundColor: '#CD0606',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 140,
    borderRadius: 15,
    marginTop: 10,
  },
  textButton: {
    fontSize: 22,
    color: 'white',
  },
  buttonContainerR: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 140,
    borderRadius: 15,
    marginTop: 10,
  },
  textButtonR: {
    fontSize: 22,
    color: '#CD0606',
  },
});
