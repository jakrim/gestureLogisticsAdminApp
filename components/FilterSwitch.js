import React from 'react';
import {
  View,
  Text,
  Switch,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors';
const { width } = Dimensions.get('window');

const FilterSwitch = (props) => {
  return (
    <View style={{ ...styles.filterContainer, ...props.style }}>
      <View style={styles.textSwitch}>
        <Text style={{ fontFamily: 'dm-sans-regularItalic' }} t>
          {props.label}
        </Text>
        <View style={{ alignItems: 'flex-end' }}>
          <Switch
            trackColor={{ true: Colors.primaryColor }}
            thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
            value={props.state}
            onValueChange={props.onChange}
          />
        </View>
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
    width: Platform.OS === 'android' ? '100%' : '100%',
    paddingHorizontal: 5,
  },
});

export default FilterSwitch;
