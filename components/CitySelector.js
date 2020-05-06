import React, { useState } from 'react';
import {
  Platform,
  TouchableOpacity,
  FlatList,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import FilterSwitch from './FilterSwitch';
import { createCitySelectorState } from '../components/HelperFunctions';

const CitySelector = (props) => {
  let cities = useSelector((state) => state.orders.cities);
  let cityState = createCitySelectorState(cities);
  const [values, setValues] = useState(cityState);

  const setSwitchValue = (val, index) => {
    const tempData = values.listKeys;
    tempData[index].switch = val;
    setValues({ listKeys: tempData });
    passSelectedCities(values.listKeys[index].key, index);
  };

  const passSelectedCities = (city, cityIndex) => {
    if (values.listKeys[cityIndex].switch === false) {
      let temp = [...props.selectedCities];
      props.setSelectedCities(
        temp.filter((city) => city !== values.listKeys[cityIndex].key)
      );
    }
    if (values.listKeys[cityIndex].switch === true) {
      if (props.selectedCities.includes(city)) {
        return;
      }
      props.setSelectedCities((state) => [...state, city]);
    }
  };

  let TouchableComp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      keyExtractor={(item) => item}
      data={cities}
      numColumns={2}
      renderItem={({ item, index }) => {
        return (
          <TouchableComp style={styles.component}>
            <FilterSwitch
              // style={{ alignItems: 'center' }}
              label={item}
              state={values.listKeys[index].switch}
              onChange={(value) => setSwitchValue(value, index)}
            />
          </TouchableComp>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: 400,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  component: {
    paddingHorizontal: 5,
    width: 160,
    alignItems: 'flex-start',
    fontFamily: 'dm-sans-italic',
    padding: 2,
  },
});

export default CitySelector;
