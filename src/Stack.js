import React from 'react';
import {connect} from 'react-redux';
import {View, Image, StyleSheet} from 'react-native';

import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

import quyengop from '../images/quyengop.png';
import thongbao from '../images/account.png';
import newIcon from '../images/news.png';
import homeIcon from '../images/Home1.png';

import intro from './components/intro';
import login from './components/login';
import signin from './components/signin';
import forgot_pass from './components/forgot_pass';
import reset_pass from './components/reset_pass';
import otp from './components/otp';
import donate_infor from './components/donate_infor';
import notice from './components/notice';
import news_details from './components/news_detail';
import home from './components/home';
import menu from './components/menu';
import blog from './components/blog';
import account from './components/account';
import account_info from './components/account_info';
import contact from './components/contact';
import guide from './components/guide';
import history from './components/history';

const BlogPage = createStackNavigator({
  Blog: {
    screen: blog,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const DonatePage = createStackNavigator({
  Donate_infor: {
    screen: donate_infor,
    navigationOptions: {
      headerShown: false,
    },
  },
  New_details: {
    screen: news_details,
    navigationOptions: {
      headerTitle: 'Chi Tiết',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontSize: f(2.5), color: 'white'},
      headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
    },
  },
});

const HomePage = createStackNavigator(
  {
    Intro: {
      screen: intro,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: login,
      navigationOptions: {
        headerTitle: 'Đăng Nhập',
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: f(2.5), color: 'white'},
        headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
      },
    },
    Signin: {
      screen: signin,
      navigationOptions: {
        headerTitle: 'Đăng Ký',
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: f(2.5), color: 'white'},
        headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
      },
    },
    Forgot_pass: {
      screen: forgot_pass,
      navigationOptions: {
        headerTitle: 'Quên Mật Khẩu',
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: f(2.5), color: 'white'},
        headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
      },
    },
    Reset_pass: {
      screen: reset_pass,
      navigationOptions: {
        headerTitle: 'Xác Nhận Mật Khẩu',
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: f(2.5), color: 'white'},
        headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
      },
    },
  },
  {
    initialRouteName: 'Intro',
  },
);

const Tabbar = createBottomTabNavigator(
  {
    'TRANG CHỦ': {
      screen: home,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          if (focused) {
            return (
              <View>
                <Image style={styles.tabIconActive} source={homeIcon} />
              </View>
            );
          } else {
            return <Image style={styles.tabIconInActive} source={homeIcon} />;
          }
        },
        // tabBarVisible: false,
      },
    },
    'QUYÊN GÓP': {
      screen: DonatePage,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          if (focused) {
            return (
              <View>
                <Image style={styles.tabIconActive} source={quyengop} />
              </View>
            );
          } else {
            return <Image style={styles.tabIconInActive} source={quyengop} />;
          }
        },
        // tabBarVisible: false,
      },
    },
    'TIN TỨC': {
      screen: BlogPage,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          if (focused) {
            return <Image style={styles.tabIconActive} source={newIcon} />;
          } else {
            return <Image style={styles.tabIconInActive} source={newIcon} />;
          }
        },
        // tabBarVisible: false,
      },
    },
    'TÀI KHOẢN': {
      screen: account,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          if (focused) {
            return <Image style={styles.tabIconActive} source={thongbao} />;
          } else {
            return <Image style={styles.tabIconInActive} source={thongbao} />;
          }
        },
        // tabBarVisible: false,
      },
    },
  },

  {
    swipeEnabled: true,
    tabBarOptions: {
      tabStyle: {
        borderTopWidth: 0.2,
        borderTopColor: '#545454',
      },
      labelStyle: {
        fontSize: f(1.25),
      },
      inactiveTintColor: '#545454',
      activeTintColor: '#AE1F17',
      inactiveBackgroundColor: 'white',
      activeBackgroundColor: '#efefef',
      showIcon: true,
    },
  },
);

const Account = createStackNavigator({
  Account: {
    screen: account,
    navigationOptions: {
      headerTitle: 'Tài Khoản',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontSize: f(2.5), color: 'white'},
      headerStyle: {backgroundColor: '#AE1F17'},
    },
  },
});

const Account_info = createStackNavigator({
  Account_info: {
    screen: account_info,
    navigationOptions: {
      headerTitle: 'Thông Tin Cá Nhân',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontSize: f(2.5), color: 'white'},
      headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
    },
  },
});

const History = createStackNavigator({
  History: {
    screen: history,
    navigationOptions: {
      headerTitle: 'Lịch Sử Giao Dịch',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontSize: f(2.5), color: 'white'},
      headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
    },
  },
});

const OTP = createStackNavigator({
  OTP: {
    screen: otp,
    navigationOptions: {
      headerTitle: 'Thay Đổi Mật Khẩu',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontSize: f(2.5), color: 'white'},
      headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
    },
  },
});

const Notice = createStackNavigator({
  Notice: {
    screen: notice,
    navigationOptions: {
      headerTitle: 'Thông Báo',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontSize: f(2.5), color: 'white'},
      headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
    },
  },
  // initialRouteName: 'Account',
});

const Contact = createStackNavigator({
  Contact: {
    screen: contact,
    navigationOptions: {
      headerTitle: 'Liên Hệ Và Góp Ý',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontSize: f(2.5), color: 'white'},
      headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
    },
  },
  // initialRouteName: 'Account',
});
const Guide = createStackNavigator({
  Guide: {
    screen: guide,
    navigationOptions: {
      headerTitle: 'Hướng Dẫn Nạp Tiền',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontSize: f(2.5), color: 'white'},
      headerStyle: {backgroundColor: '#AE1F17', height: hp('8%')},
    },
  },
  // initialRouteName: 'Account',
});
const Menutab = createDrawerNavigator(
  {
    drawer: Tabbar,
    Account: {
      screen: Account,
    },
    Account_info: {
      screen: Account_info,
    },
    Contact: {
      screen: Contact,
    },
    Guide: {
      screen: Guide,
    },
    OTP: {
      screen: OTP,
    },
    History: {
      screen: History,
    },
    Notice: {
      screen: Notice,
    },
  },
  {
    contentComponent: menu,
    drawerWidth: wp('70%'),
  },
);

const Switch = createSwitchNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        header: null,
      },
    },
    Main: {
      screen: Menutab,
    },
  },
  {
    initialRouteName: 'HomePage',
  },
);

export default connect()(createAppContainer(Switch));

const styles = StyleSheet.create({
  tabIconActive: {
    width: 25,
    height: 25,
    tintColor: '#AE1F17',
  },
  tabIconInActive: {
    width: 20,
    height: 20,
    marginTop: 10,
    tintColor: '#545454',
  },
});
