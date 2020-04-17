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

import MultiSwitch from '../components/MultiSwitch/index';
import StyledButton from './StyledButton';
import Checkbox from './Checkbox';
import * as ordersActions from '../store/actions/orders';
import { FiltersContext } from '../components/FiltersContext';

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const CitySelector = (props) => {
  const [citySelected, setCitySelected] = useState(false);
  const dispatch = useDispatch();
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  let cities = useSelector((state) => state.orders.cities);
  // console.log('CitySelector -> citySelected', citySelected);
  // let zones = useSelector((state) => state.orders.zones);

  return (
    <FlatList
      keyExtractor={(item) => item}
      data={cities}
      renderItem={(itemdata) => (
        <TouchableComp
          style={{ alignItems: 'center', padding: 2 }}
          onPress={() => {
            // setCitySelected(itemData.item);
          }}
        >
          <Checkbox getCities={props.getCities} city={itemdata.item} />
        </TouchableComp>
      )}
    />
  );
};

const OrdersModal = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isZone, setIsZone] = useState(false);
  const [filterOption, setFilterOption] = useState(false);
  const [cities, setCities] = useState([]);
  console.log('OrdersModal -> cities', cities);

  const { filters, setFilters } = useContext(FiltersContext);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      zone: isZone,
      cities: cities,
      filter: filterOption,
    };
    // console.log('appliedFilters in Modal', appliedFilters);
    dispatch(ordersActions.setFilters(appliedFilters));
    dispatch(ordersActions.fetchOrders(appliedFilters));
    setFilters(appliedFilters);
    setModalVisible(!modalVisible);
  }, [isZone, filterOption, dispatch]);

  const chosenCities = (selectedCity) => {
    console.log('chosenCities -> selectedCities', selectedCity);
    if (cities.includes(selectedCity)) {
      return;
    } else {
      setCities([...cities, selectedCity]);
    }
  };

  return (
    <>
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
                  // console.log('Change Status ', filter);
                }}
                disableSwitch={false}
              />
              <FilterSwitch
                label='Cities'
                state={isZone}
                onChange={() => setIsZone(!isZone)}
              />
              {isZone ? <CitySelector getCities={chosenCities} /> : <></>}

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
    </>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    marginVertical: 15,
  },
});

export default OrdersModal;
