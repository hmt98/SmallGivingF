import React, {Component} from 'react';
import {StyleSheet, Text, View, RefreshControl, FlatList} from 'react-native';
import {getBlogFromServer} from '../../networking/Server';
import Item_blog from './blog_item';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';

export default class blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      blogFromServer: [],
    };
  }
  componentDidMount() {
    this.refreshDataFromServer();
  }
  refreshDataFromServer = () => {
    this.setState({refreshing: true});
    getBlogFromServer()
      .then((blog) => {
        this.setState({blogFromServer: blog, refreshing: false});
      })
      .catch((error) => {
        this.setState({blogFromServer: [], refreshing: false});
      });
  };
  onRefresh = () => {
    this.refreshDataFromServer();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ViThongbao}>
          <Text style={styles.txtThongbao}>Tin Tức</Text>
        </View>
        <FlatList
          data={this.state.blogFromServer}
          renderItem={({item, index}) => <Item_blog item={item} />}
          keyExtractor={(item, index) => item.idTin}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ViThongbao: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('8%'),
    backgroundColor: '#AE1F17',
  },
  txtThongbao: {
    fontSize: f(2.5),
    color: 'white',
  },
});
