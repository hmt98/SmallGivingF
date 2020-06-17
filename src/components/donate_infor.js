import React, {Component} from 'react';
import {View, Dimensions, RefreshControl, Alert} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {getHoatDongFromServer} from '../../networking/Server';
import Donate_infor_items from './donate_infor_items';

export default class donate_infor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      hoatdongFromServer: [],
      follow: false,
      shake: true,
    };
  }

  follow = () => {
    this.setState({follow: !this.state.follow});
  };

  shake = () => {
    this.setState({shake: this.state.shake});
  };

  componentDidMount() {
    this.refreshDataFromServer();
  }
  refreshDataFromServer = () => {
    this.setState({refreshing: true});
    getHoatDongFromServer()
      .then((hoatdong) => {
        this.setState({hoatdongFromServer: hoatdong, refreshing: false});
      })
      .catch((error) => {
        this.setState({hoatdongFromServer: [], refreshing: false});
      });
  };
  onRefresh = () => {
    this.refreshDataFromServer();
  };

  render() {
    return (
      <View>
        <Carousel
          sliderWidth={wp('100%')}
          sliderHeight={hp('100%')}
          itemWidth={wp('90%')}
          data={this.state.hoatdongFromServer}
          renderItem={(item) => (
            <Donate_infor_items
              item={item.item}
              index={item.index}
              navigation={this.props.navigation}
            />
          )}
          hasParallaxImages={true}
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
