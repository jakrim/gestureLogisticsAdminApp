import React, { useState } from 'react';
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

export const Checkbox = (props) => {
  const [selected, setSelected] = useState(false);
  // const [cities, setCities] = useState([]);

  let TouchableComp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    <TouchableComp
      style={styles.checkBox}
      onPress={() => {
        setSelected(!selected);
        if (!selected) {
          props.getCities(props.city);
        }
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
