import React, { useState, useCallback, useContext } from 'react';
import { Modal, View, Text, Platform, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary';
import MultiSwitch from './MultiSwitch/index';
import StyledButton from './StyledButton';
import CitySelector from './CitySelector';
import FilterSwitch from './FilterSwitch';
import { OrderFiltersContext } from './ApplicationContexts';

const OrdersModal = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [filterOption, setFilterOption] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const { setFilters } = useContext(OrderFiltersContext);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isCity: isCity,
      cities: selectedCities,
      filter: filterOption,
    };

    try {
      setModalVisible(!modalVisible);
      setFilters(appliedFilters);
    } catch (err) {
      console.log('Error in Orders Modal Try block');
    }
    setIsCity(false);
    setSelectedCities([]);
  }, [isCity, filterOption, selectedCities, dispatch]);

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

              <MultiSwitch
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
                }}
              >
                <FilterSwitch
                  label='Cities'
                  state={isCity}
                  onChange={() => setIsCity(!isCity)}
                />
              </View>
              <View style={styles.cities}>
                {isCity ? (
                  <View style={{ height: 400 }}>
                    <CitySelector
                      setSelectedCities={setSelectedCities}
                      selectedCities={selectedCities}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </View>
              <View style={{ paddingTop: 10 }}>
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
    paddingTop: Platform.OS === 'android' ? 85 : 120,
    alignItems: 'center',
  },
  modalView: {
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
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
    color: Colors.primaryColor,
  },
  cities: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default OrdersModal;
