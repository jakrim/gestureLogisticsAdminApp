import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
import ColorsConst from './Colors';

const Colors = {
  mBackColor: '#efefef',
  mBorderColor: '#efefef',
  white: '#FFFFFF',
  shadowColor: '#A69E9E',
};

const Metrics = {
  containerWidth: width - 70,
  switchWidth: width / 3.5,
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.containerWidth,
    height: 55,
    flexDirection: 'row',
    backgroundColor: Colors.mBackColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.mBorderColor,
    borderRadius: 27.5,
  },

  switcher: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.white,
    borderRadius: 28,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.switchWidth,
    elevation: 4,
    shadowOpacity: 0.31,
    shadowRadius: 10,
    shadowColor: Colors.shadowColor,
  },
  buttonStyle: {
    flex: 1,
    width: Metrics.containerWidth / 3.1,
    height: 54,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 5,
  },
  iconStyle: {
    position: 'relative',
    top: 10,
  },
  offIconText: {
    fontFamily: 'dm-sans-bold',
    fontSize: 10,
    color: Colors.shadowColor,
  },
  onIconText: {
    fontFamily: 'dm-sans-bold',
    fontSize: 10,
    color: ColorsConst.primaryColor,
  },
  textContainer: {
    flex: 1,
    // position: 'absolute',
    top: 7,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttons: {
    alignItems: 'center',
  },
});

export default styles;
