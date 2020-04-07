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
  ScrollView
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import StyledButton from '../components/StyledButton';
import Checkbox from '../components/Checkbox';
import { setFilters } from '../store/actions/orders';

const zoneData = {
  cities: 'Brooklyn,Manhattan,Los Angeles',
  city_zones: {
    Brooklyn: 'bk_1',
    Manhattan: 'zone1,zone2,zone3,zone4,zone5,zone6,zone7,zone8',
    'Los Angeles': 'la_1'
  }
};

const convertZoneData = () => {
  const cities = zoneData.cities.split(',');
  return cities;
};

const FilterSwitch = props => {
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

const CitySelector = props => {
  const [check, setCheck] = useState(false);
  // console.log('selected', selected);
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    <FlatList
      keyExtractor={item => item}
      data={convertZoneData()}
      renderItem={itemdata => (
        <TouchableComp>
          <Checkbox city={itemdata.item} />
        </TouchableComp>
      )}
    />
  );
};

const StyledModal = props => {
  const [citySelected, setCitySelected] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isZone, setIsZone] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [isOnDemand, setIsOnDemand] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      zone: isZone,
      scheduled: isScheduled,
      onDemand: isOnDemand
    };

    dispatch(setFilters(appliedFilters));
  }, [isZone, isScheduled, isOnDemand, dispatch]);

  useEffect(() => {
    CommonActions.setParams({ save: saveFilters });
  }, [saveFilters]);

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
          onRequestClose={() => {
            console.log('Closed');
          }}
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

              {/* <ScrollView style={{ maxWidth: 500 }} horizontal='false'> */}
              <FilterSwitch
                label='Cities'
                state={isZone}
                onChange={() => setIsZone(!isZone)}
              />
              {isZone ? <CitySelector /> : <></>}
              <FilterSwitch
                label='Scheduled'
                state={isScheduled}
                onChange={newValue => setIsScheduled(newValue)}
              />
              <FilterSwitch
                label='On Demand'
                state={isOnDemand}
                onChange={newValue => setIsOnDemand(newValue)}
              />
              {/* </ScrollView> */}
              <View style={styles.buttonContainer}>
                <StyledButton
                  style={{ backgroundColor: Colors.accentColor }}
                  onPress={() => setModalVisible(!modalVisible)}
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
    position: 'absolute'
  },
  centeredView: {
    flex: 1,
    paddingTop: 120,
    alignItems: 'center'
  },
  modalView: {
    width: 380,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 4,
      height: 8
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10
  },
  modalText: {
    fontFamily: 'dm-sans-regular',
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    marginVertical: 15
  }
});

export default StyledModal;
