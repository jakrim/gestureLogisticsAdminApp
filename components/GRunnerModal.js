import React, { useState, useCallback, useContext } from 'react';
import { Modal, View, Text, Platform, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary';
import GRunMultiSwitch from './GRunMultiSwitch/index';
import StyledButton from './StyledButton';
import CitySelector from './CitySelector';
import FilterSwitch from './FilterSwitch';
import { GrunnerFiltersContext } from './ApplicationContexts';

const OrdersModal = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [hasCurrentOrder, setHasCurrentOrder] = useState(false);
  const [filterOption, setFilterOption] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const { setGFilters } = useContext(GrunnerFiltersContext);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      hasCurrentOrder: hasCurrentOrder,
      isCity: isCity,
      cities: selectedCities,
      filter: filterOption,
    };
    try {
      setModalVisible(!modalVisible);
      setGFilters(appliedFilters);
    } catch (err) {
      console.log('Error in G Runner Modal Try block');
    }
    setHasCurrentOrder(false);
    setIsCity(false);
    setSelectedCities([]);
  }, [isCity, filterOption, hasCurrentOrder, selectedCities, dispatch]);

  return (
    <ErrorBoundary>
      <View style={styles.icon}>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-funnel' : 'md-funnel'}
          color={'white'}
          size={25}
          onPress={() => setModalVisible(!modalVisible)}
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
              <GRunMultiSwitch
                currentStatus={'noFilter'}
                disableScroll={(value) => {
                  // console.log('scrollEnabled', value);
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
                  label='Has Current Order'
                  state={hasCurrentOrder}
                  onChange={() => setHasCurrentOrder(!hasCurrentOrder)}
                />
                {/* <FilterSwitch
                  label='Cities'
                  state={isCity}
                  onChange={() => setIsCity(!isCity)}
                /> */}
              </View>
              {/* {isCity ? (
                <View style={{ height: 400 }}>
                  <CitySelector
                    setSelectedCities={setSelectedCities}
                    selectedCities={selectedCities}
                  />
                </View>
              ) : (
                <></>
              )} */}
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
  modalText: {
    fontFamily: 'dm-sans-regular',
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default OrdersModal;
