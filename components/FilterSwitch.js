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
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'flex-start',
    width: '100%',
  },
});

export default FilterSwitch;
