import React, { useState } from 'react';

import { Platform, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import FilterSwitch from './FilterSwitch';
import { createCitySelectorState } from '../components/HelperFunctions';

const CitySelector = (props) => {
  let cities = useSelector((state) => state.orders.cities);
  console.log('CitySelector -> cities', cities);
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

  return (
    <FlatList
      contentContainerStyle={styles.list}
      keyExtractor={(item) => item}
      data={cities}
      numColumns={2}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item, index }) => {
        return (
          <FilterSwitch
            style={styles.switch}
            label={item}
            state={values.listKeys[index].switch}
            onChange={(value) => setSwitchValue(value, index)}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: Platform.OS === 'android' ? '50%' : '100%',
    height: 400,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switch: {
    paddingHorizontal: 5,
    width: 160,
    padding: 2,
  },
});

export default CitySelector;
