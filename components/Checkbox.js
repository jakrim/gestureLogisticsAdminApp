import React, { useState, useReducer } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as ordersActions from '../store/actions/orders';

export const Checkbox = (props) => {
  const [selected, setSelected] = useState(false);
  // const [cities, setCities] = useState([]);
  // console.log('Checkbox -> cities', cities);
  const dispatch = useDispatch();

  let TouchableComp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  // citiesArr = [Brooklyn, Manhattan];
  const addOrRemoveCity = () => {
    if (!selected) {
    } else {
      dispatch(ordersActions.removeCity());
      let idx = cities.indexOf(props.city);
      console.log('addOrRemoveCity -> idx', idx);
      let temp = [...cities];
      temp.splice(idx, 1);
      setCities(temp);
      console.log('addOrRemoveCity -> temp', temp);
    }
  };
  // array.getIndex

  return (
    <TouchableComp
      style={styles.checkBox}
      onPress={() => {
        addOrRemoveCity;
        setSelected(!selected);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.textStyle}>{props.city}</Text>
        <Ionicons
          name={
            selected
              ? Platform.OS === 'android'
                ? 'md-checkbox'
                : 'ios-checkbox'
              : Platform.OS === 'android'
              ? 'md-square'
              : 'ios-square-outline'
          }
          size={24}
          color={Colors.primaryColor}
        />
      </View>
    </TouchableComp>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textStyle: {
    color: 'black',
    fontFamily: 'dm-sans-bold',
    textAlign: 'center',
    fontSize: 18,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginVertical: 5,
  },
});

export default Checkbox;
