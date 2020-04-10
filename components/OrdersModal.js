import React, { useState, useEffect, useCallback } from 'react';
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

import StyledButton from './StyledButton';
import Checkbox from './Checkbox';
import * as ordersActions from '../store/actions/orders';

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

  useEffect(() => {
    try {
      dispatch(ordersActions.fetchZones());
    } catch (err) {
      console.log('error in fetching cities', err);
    }
  });

  return (
    <FlatList
      keyExtractor={(item) => item}
      data={cities}
      renderItem={(itemdata) => (
        <TouchableComp style={{ alignItems: 'center', padding: 2 }}>
          <Checkbox city={itemdata.item} />
        </TouchableComp>
      )}
    />
  );
};

const OrdersModal = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isZone, setIsZone] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [isOnDemand, setIsOnDemand] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      zone: isZone,
      scheduled: isScheduled,
      onDemand: isOnDemand,
    };
    console.log(appliedFilters);
    dispatch(ordersActions.setFilters(appliedFilters));
  }, [isZone, isScheduled, isOnDemand, dispatch]);

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

              <FilterSwitch
                label='Cities'
                state={isZone}
                onChange={() => setIsZone(!isZone)}
              />
              {isZone ? <CitySelector /> : <></>}
              <FilterSwitch
                label='Scheduled'
                state={isScheduled}
                onChange={(newValue) => setIsScheduled(newValue)}
              />
              <FilterSwitch
                label='On Demand'
                state={isOnDemand}
                onChange={(newValue) => setIsOnDemand(newValue)}
              />

              <View>
                <StyledButton
                  style={{ backgroundColor: Colors.accentColor }}
                  onPress={saveFilters}
                  // onPressIn={() => setModalVisible(!modalVisible)}
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
    width: 350,
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
