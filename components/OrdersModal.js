import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  Modal,
  View,
  Text,
  Switch,
  Platform,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary';
import MultiSwitch from '../components/MultiSwitch/index';
import StyledButton from './StyledButton';
import Checkbox from './Checkbox';
import * as ordersActions from '../store/actions/orders';
import { FiltersContext } from '../components/FiltersContext';

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

const CitySelector = (props) => {
  const [citySelected, setCitySelected] = useState(false);
  //! When a new City is added to the citiesAPI -> MUST add the city as an object to the state below.
  const [values, setValues] = useState({
    listKeys: [
      { key: 'Brooklyn', switch: false },
      { key: 'Manhattan', switch: false },
      { key: 'Los Angeles', switch: false },
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
      contentContainerStyle={{
        width: '50%',
        paddingVertical: 10,
      }}
      keyExtractor={(item) => item}
      data={cities}
      renderItem={({ item, index }) => {
        return (
          <TouchableComp
            style={{
              alignItems: 'flex-start',
              fontFamily: 'dm-sans-italic',
              padding: 2,
            }}
          >
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

const OrdersModal = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [filterOption, setFilterOption] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  console.log('OrdersModal -> selectedCities', selectedCities);
  const [filterObj, setFilterObj] = useState(initialState);

  const { filters, setFilters } = useContext(FiltersContext);
  const initialState = {
    isCity: false,
    cities: [],
    filter: 'noFilter',
  };

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isCity: isCity,
      cities: selectedCities,
      filter: filterOption,
    };

    setFilterObj(appliedFilters);
    dispatch(ordersActions.fetchOrders(filterObj));
    setFilters(filterObj);
    setModalVisible(!modalVisible);

    // resetFilters();
  }, [isCity, filterOption, filterObj, selectedCities, dispatch]);

  const resetFilters = () => {
    if (!modalVisible) {
      setFilterObj(initialState);
    }
    console.log('OrdersModal -> filterObj', filterObj);
  };

  return (
    <ErrorBoundary>
      <View style={styles.icon}>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-funnel' : 'md-funnel'}
          color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
          size={25}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          // onRequestClose={() => {
          //   console.log('Closed');
          // }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
                size={30}
                style={{ position: 'absolute', top: 10, right: 20 }}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Text style={styles.modalText}>Filter Data:</Text>
              <MultiSwitch
                currentStatus={'noFilter'}
                disableScroll={(value) => {
                  console.log('scrollEnabled', value);
                }}
                isParentScrollDisabled={false}
                onStatusChanged={(filter) => {
                  setFilterOption(filter);
                }}
                disableSwitch={false}
              />
              <View
                style={{
                  width: 200,
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}
              >
                <FilterSwitch
                  label='Cities'
                  state={isCity}
                  onChange={() => setIsCity(!isCity)}
                />
              </View>
              {isCity ? (
                <CitySelector
                  setSelectedCities={setSelectedCities}
                  selectedCities={selectedCities}
                  // getSelectedCities={getSelectedCities}
                />
              ) : (
                <></>
              )}
              <View>
                <StyledButton
                  style={{ backgroundColor: Colors.accentColor }}
                  onPress={saveFilters}
                >
                  <Text style={styles.textStyle}>Confirm Settings</Text>
                </StyledButton>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: 15,
    position: 'absolute',
  },
  centeredView: {
    flex: 1,
    paddingTop: 120,
    alignItems: 'center',
  },
  modalView: {
    width: 340,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {},
  modalText: {
    fontFamily: 'dm-sans-regular',
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
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

export default OrdersModal;

// filterContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-evenly',
//   alignItems: 'center',
//   paddingHorizontal: 160,
//   width: '100%',
//   marginVertical: 15,
// },
