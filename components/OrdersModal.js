import React, { useState, useCallback, useContext, useReducer } from 'react';
import { Modal, View, Text, Platform, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';

import ErrorBoundary from '../components/ErrorBoundary';
import MultiSwitch from '../components/MultiSwitch/index';
import StyledButton from './StyledButton';
import CitySelector from './CitySelector';
import FilterSwitch from './FilterSwitch';
import * as ordersActions from '../store/actions/orders';
import { FiltersContext } from '../components/FiltersContext';

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
    setIsLoading(true);
    const appliedFilters = {
      isCity: isCity,
      cities: selectedCities,
      filter: filterOption,
    };
    try {
      setFilterObj(appliedFilters);
      dispatch(ordersActions.fetchOrders(filterObj));
      setFilters(filterObj);
      // setTimeout(() => {
      setModalVisible(!modalVisible);
      // console.log('HEREREERER');
      // resetFilters(initialState);
      // }, 2000);
    } catch (err) {
      console.log('Error in Orders Modal Try block');
    }

    setIsLoading(false);
  }, [isCity, filterOption, filterObj, selectedCities, dispatch]);

  const resetFilters = (state) => {
    if (!modalVisible) {
      setFilterObj(state);
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
