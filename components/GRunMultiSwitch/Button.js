import React from 'react';
import { TouchableOpacity, View, Platform, Text } from 'react-native';
import styles from '../../constants/styles';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const getIcon = (type, active) => {
  let icon;
  switch (type) {
    case 'online':
      icon = active ? (
        <View style={styles.buttons}>
          <Ionicons
            name={
              Platform.OS === 'android'
                ? 'md-radio-button-on'
                : 'ios-radio-button-on'
            }
            size={20}
            color={Colors.primaryColor}
            style={styles.iconStyle}
          />
          <View style={styles.textContainer}>
            <Text style={styles.onIconText}>online</Text>
          </View>
        </View>
      ) : (
        <View style={styles.buttons}>
          <Ionicons
            name={
              Platform.OS === 'android'
                ? 'md-radio-button-on'
                : 'ios-radio-button-on'
            }
            size={20}
            color='black'
            style={styles.iconStyle}
          />
          <View style={styles.textContainer}>
            <Text style={styles.offIconText}>online</Text>
          </View>
        </View>
      );
      break;
    case 'noFilter':
      icon = active ? (
        <View style={styles.buttons}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-power' : 'ios-power'}
            size={20}
            color={Colors.primaryColor}
            style={styles.iconStyle}
          />
          <View style={styles.textContainer}>
            <Text style={styles.onIconText}>off</Text>
          </View>
        </View>
      ) : (
        <View style={styles.buttons}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-power' : 'ios-power'}
            size={20}
            color='black'
            style={styles.iconStyle}
          />
          <View style={styles.textContainer}>
            <Text style={styles.offIconText}>off</Text>
          </View>
        </View>
      );
      break;
    case 'offline':
      icon = active ? (
        <View style={styles.buttons}>
          <Ionicons
            name={
              Platform.OS === 'android'
                ? 'md-radio-button-off'
                : 'ios-radio-button-off'
            }
            size={20}
            color={Colors.primaryColor}
            style={styles.iconStyle}
          />
          <View style={styles.textContainer}>
            <Text style={styles.onIconText}>offline</Text>
          </View>
        </View>
      ) : (
        <View style={styles.buttons}>
          <Ionicons
            name={
              Platform.OS === 'android'
                ? 'md-radio-button-off'
                : 'ios-radio-button-off'
            }
            size={20}
            color='black'
            style={styles.iconStyle}
          />
          <View style={styles.textContainer}>
            <Text style={styles.offIconText}>offline</Text>
          </View>
        </View>
      );
      break;
  }
  return icon;
};

const Button = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
        {getIcon(props.type, props.active)}
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  active: false,
};

export default Button;
