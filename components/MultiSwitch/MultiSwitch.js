import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  View,
  Platform,
} from 'react-native';
import Button from './Button';
import styles from '../../constants/MultiSwitchStyles';
const { width } = Dimensions.get('window');
import PropTypes from 'prop-types';

export default class MultiSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStatus: props.currentStatus,
      isComponentReady: false,
      position: new Animated.Value(0),
      posValue: 0,
      selectedPosition: 0,
      duration: 100,
      mainWidth: width - 55,
      switcherWidth: width / 3,
      thresholdDistance: width - 8 - width / 2.4,
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        // disable parent scroll if slider is inside a scrollview
        if (!this.isParentScrollDisabled) {
          this.props.disableScroll(false);
          this.isParentScrollDisabled = true;
        }
      },

      onPanResponderMove: (evt, gestureState) => {
        if (!this.props.disableSwitch) {
          let finalValue = gestureState.dx + this.state.posValue;
          if (finalValue >= 0 && finalValue <= this.state.thresholdDistance)
            this.state.position.setValue(this.state.posValue + gestureState.dx);
        }
      },

      onPanResponderTerminationRequest: () => true,

      onPanResponderRelease: (evt, gestureState) => {
        if (!this.props.disableSwitch) {
          let finalValue = gestureState.dx + this.state.posValue;
          this.isParentScrollDisabled = false;
          this.props.disableScroll(true);
          if (gestureState.dx > 0) {
            if (finalValue >= 0 && finalValue <= 30) {
              this.notStartedSelected();
            } else if (finalValue >= 30 && finalValue <= 121) {
              this.inProgressSelected();
            } else if (finalValue >= 121 && finalValue <= 280) {
              if (gestureState.dx > 0) {
                this.onDemandSelected();
              } else {
                this.inProgressSelected();
              }
            }
          } else {
            if (finalValue >= 78 && finalValue <= 175) {
              this.inProgressSelected();
            } else if (finalValue >= -100 && finalValue <= 78) {
              this.notStartedSelected();
            } else {
              this.onDemandSelected();
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
    });
    this.moveInitialState();

    this.isParentScrollDisabled = false;
  }

  // componentWillMount() {

  // }

  notStartedSelected = () => {
    if (this.props.disableSwitch) return;
    Animated.timing(this.state.position, {
      toValue: Platform.OS === 'ios' ? -2 : 0,
      duration: this.state.duration,
    }).start();
    setTimeout(() => {
      this.setState({
        posValue: Platform.OS === 'ios' ? -2 : 0,
        selectedPosition: 0,
      });
    }, 100);
    this.props.onStatusChanged('schedule');
  };

  inProgressSelected = () => {
    if (this.props.disableSwitch) return;
    Animated.timing(this.state.position, {
      toValue: this.state.mainWidth / 2 - this.state.switcherWidth / 2,
      duration: this.state.duration,
    }).start();
    setTimeout(() => {
      this.setState({
        posValue: this.state.mainWidth / 2 - this.state.switcherWidth / 2,
        selectedPosition: 1,
      });
    }, 100);
    this.props.onStatusChanged('noFilter');
  };

  onDemandSelected = () => {
    if (this.props.disableSwitch) return;
    Animated.timing(this.state.position, {
      toValue:
        Platform.OS === 'ios'
          ? this.state.mainWidth - this.state.switcherWidth
          : this.state.mainWidth - this.state.switcherWidth - 2,
      duration: this.state.duration,
    }).start();
    setTimeout(() => {
      this.setState({
        posValue:
          Platform.OS === 'ios'
            ? this.state.mainWidth - this.state.switcherWidth
            : this.state.mainWidth - this.state.switcherWidth - 2,
        selectedPosition: 2,
      });
    }, 100);
    this.props.onStatusChanged('onDemand');
  };

  getStatus = () => {
    switch (this.state.selectedPosition) {
      case 0:
        return 'schedule';
      case 1:
        return 'noFilter';
      case 2:
        return 'onDemand';
    }
  };

  moveInitialState = () => {
    switch (this.state.currentStatus) {
      case 'schedule':
        this.notStartedSelected();
        break;
      case 'noFilter':
        this.inProgressSelected();
        break;
      case 'onDemand':
        this.onDemandSelected();
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button type='schedule' onPress={this.notStartedSelected} />
        <Button type='noFilter' onPress={this.inProgressSelected} />
        <Button type='onDemand' onPress={this.onDemandSelected} />
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[
            styles.switcher,
            {
              transform: [{ translateX: this.state.position }],
            },
          ]}
        >
          <Button type={this.getStatus()} active={true} />
        </Animated.View>
      </View>
    );
  }
}

MultiSwitch.propTypes = {
  disableScroll: PropTypes.func,
  onStatusChanged: PropTypes.func,
};

MultiSwitch.defaultProps = {
  disableSwitch: true,
};
