import React from 'react';
import LottieView from 'lottie-react-native';

export default class StarsAnimation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/292-5-stars.json')}
      style={{width:"95%"}}
      autoPlay loop />
    )
  }
}
