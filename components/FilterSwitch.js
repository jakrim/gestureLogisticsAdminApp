import React from 'react';
import { View, Text, Switch, Platform, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const FilterSwitch = (props) => {
  return (
    <View style={{ ...styles.filterContainer, ...props.style }}>
      <View style={styles.textSwitch}>
        <Text style={{ fontFamily: 'dm-sans-regularItalic' }} t>
          {props.label}
        </Text>
        <Switch
          trackColor={{ true: Colors.primaryColor }}
          thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
          value={props.state}
          onValueChange={props.onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});

export default FilterSwitch;
