import React from 'react';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import Svg, { Circle, Rect } from 'react-native-svg';

const Skeleton = (props) => {
  return (
    <SvgAnimatedLinearGradient
      primaryColor='#fff0f6'
      secondaryColor='#f783ac'
      height={80}
    >
      <Rect x='0' y='0' rx='3' ry='3' width='70' height='10' />
      <Rect x='80' y='0' rx='3' ry='3' width='100' height='10' />
      <Rect x='190' y='0' rx='3' ry='3' width='10' height='10' />
      <Rect x='15' y='20' rx='3' ry='3' width='130' height='10' />
      <Rect x='155' y='20' rx='3' ry='3' width='130' height='10' />
      <Rect x='15' y='40' rx='3' ry='3' width='90' height='10' />
      <Rect x='115' y='40' rx='3' ry='3' width='60' height='10' />
      <Rect x='185' y='40' rx='3' ry='3' width='60' height='10' />
      <Svg.Rect x='0' y='60' rx='3' ry='3' width='30' height='10' />
    </SvgAnimatedLinearGradient>
  );
};

export default Skeleton;
