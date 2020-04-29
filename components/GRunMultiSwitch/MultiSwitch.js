import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  View,
  Platform,
} from 'react-native';
import Button from './Button';
import styles from './styles';
import PropTypes from 'prop-types';
const { width } = Dimensions.get('window');

export default function MultiSwitch(props) {
  const [currentStatus, setCurrentStatus] = useState(props.currentStatus);
  const [isComponentReady, setIsComponentReady] = useState(false);
  const [position, setPosition] = useState(new Animated.Value(0));
  const [posValue, setPosValue] = useState(0);
  // console.log('MultiSwitch -> posValue', posValue);
  const [selectedPosition, setSelectedPosition] = useState(1);
  const [duration, setDuration] = useState(100);
  const [mainWidth, setMainWidth] = useState(width);
  const [switcherWidth, setSwitcherWidth] = useState(width / 2);
  const [thresholdDistance, setThresholdDistance] = useState(width);
  const [isParentScrollDisabled, setIsParentScrollDisabled] = useState(false);

  // state = {
  // currentStatus: props.currentStatus,
  // isComponentReady: false,
  // position: new Animated.Value(0),
  // posValue: 0,
  // selectedPosition: 0,
  // duration: 100,
  // mainWidth: width - 30,
  // switcherWidth: width / 2.7,
  // thresholdDistance: width - 8 - width / 2.4,
  // };
  // isParentScrollDisabled = false;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        // disable parent scroll if slider is inside a scrollview
        if (!isParentScrollDisabled) {
          props.disableScroll(false);
          setIsParentScrollDisabled(true);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!props.disableSwitch) {
          let finalValue = gestureState.dx + posValue;
          if (finalValue >= 0 && finalValue <= thresholdDistance)
            position.setValue(posValue + gestureState.dx);
        }
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (!props.disableSwitch) {
          let finalValue = gestureState.dx + posValue;
          // console.log('MultiSwitch -> finalValue', finalValue);
          setIsParentScrollDisabled(false);
          props.disableScroll(false);
          if (gestureState.dx > 0) {
            if (finalValue >= 0 && finalValue <= 0) {
              online();
            } else if (finalValue >= 30 && finalValue <= 121) {
              noFilter();
            } else if (finalValue >= 121 && finalValue <= 280) {
              if (gestureState.dx > 0) {
                offline();
              } else {
                noFilter();
              }
            }
          } else {
            if (finalValue >= 78 && finalValue <= 175) {
              noFilter();
            } else if (finalValue >= -100 && finalValue <= 78) {
              online();
            } else {
              offline();
            }
          }
        }
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;
  // )
  useEffect(() => {
    moveInitialState();
  }, []);

  const online = () => {
    if (props.disableSwitch) return;
    Animated.timing(position, {
      toValue: Platform.OS === 'ios' ? -2 : 0,
      duration: duration,
    }).start();
    setTimeout(() => {
      setPosValue(Platform.OS === 'ios' ? -2 : 0), setSelectedPosition(0);
    }, 100);
    props.onStatusChanged('online');
  };

  const noFilter = () => {
    if (props.disableSwitch) return;
    Animated.timing(position, {
      toValue: mainWidth / 2 - switcherWidth / 2,
      duration: duration,
    }).start();
    setTimeout(() => {
      setPosValue(mainWidth / 2 - switcherWidth / 2), setSelectedPosition(1);
    }, 100);
    props.onStatusChanged('noFilter');
  };

  const offline = () => {
    if (props.disableSwitch) return;
    Animated.timing(position, {
      toValue:
        Platform.OS === 'ios'
          ? mainWidth - switcherWidth
          : mainWidth - switcherWidth - 4,
      duration: duration,
    }).start();
    setTimeout(() => {
      setPosValue(
        Platform.OS === 'ios'
          ? mainWidth - switcherWidth
          : mainWidth - switcherWidth - 2
      ),
        setSelectedPosition(2);
    }, 100);
    props.onStatusChanged('offline');
  };

  const getStatus = () => {
    switch (selectedPosition) {
      case 0:
        return 'online';
      case 1:
        return 'noFilter';
      case 2:
        return 'offline';
    }
  };

  const moveInitialState = () => {
    switch (currentStatus) {
      case 'online':
        online();
        break;
      case 'noFilter':
        noFilter();
        break;
      case 'offline':
        offline();
        break;
    }
  };

  // console.log('MultiSwitch -> position', position);
  return (
    <View style={styles.container}>
      <Button type='online' onPress={online} />
      <Button type='noFilter' onPress={noFilter} />
      <Button type='offline' onPress={offline} />
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.switcher,
          {
            transform: [{ translateX: position }],
          },
        ]}
      >
        <Button type={getStatus()} active={true} />
      </Animated.View>
    </View>
  );
}

MultiSwitch.propTypes = {
  disableScroll: PropTypes.func,
  onStatusChanged: PropTypes.func,
};

MultiSwitch.defaultProps = {
  disableSwitch: false,
};
