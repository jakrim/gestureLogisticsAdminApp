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

const CitySelector = (props) => {
  const [citySelected, setCitySelected] = useState(false);
  //! When a new City is added to the citiesAPI -> MUST add the city as an object to the state below.
  const [values, setValues] = useState({
    listKeys: [
      { key: 'Manhattan', switch: false },
      { key: 'Bronx', switch: false },
      { key: 'Brooklyn', switch: false },
      { key: 'Boston', switch: false },
      { key: 'Washington DC', switch: false },
      { key: 'Atlanta', switch: false },
      { key: 'Chicago', switch: false },
      { key: 'Denver', switch: false },
      { key: 'Las Vegas', switch: false },
      { key: 'Los Angeles', switch: false },
      { key: 'San Francisco', switch: false },
    ],
  });
  let cities = useSelector((state) => state.orders.cities);

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
      renderItem={({ item, index }) => {
        return (
          <TouchableComp style={styles.component}>
            <FilterSwitch
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
    width: '50%',
    paddingVertical: 10,
  },
  component: {
    alignItems: 'flex-start',
    fontFamily: 'dm-sans-italic',
    padding: 2,
  },
});

export default CitySelector;
