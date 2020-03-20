import React from 'react';
import { Image } from 'react-native';

const LogoTitle = props => (
  <Image
    style={{ width: 150, height: 20 }}
    source={require('../assets/no-logo.png')}
  />
);

export default LogoTitle;
