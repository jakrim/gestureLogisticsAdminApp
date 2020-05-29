import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
var _ = require('lodash');

import ErrorBoundary, { throwError } from '../components/ErrorBoundary';
import Colors from '../constants/Colors';
import {
  OrdersSearchContext,
  AreSearchingOrders,
  ScreenContext,
  GRunnersSearchContext,
  AreSearchingGrunners,
} from './ApplicationContexts';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchableData, setSearchableData] = useState({});
  const { searchOrders, setSearchOrders } = useContext(OrdersSearchContext);
  const { screenContext, setScreenContext } = useContext(ScreenContext);
  const { areSearchingOrders, setAreSearchingOrders } = useContext(
    AreSearchingOrders
  );
  const { searchGrunners, setSearchGrunners } = useContext(
    GRunnersSearchContext
  );

  const { areSearchingGrunners, setAreSearchingGrunners } = useContext(
    AreSearchingGrunners
  );
  let ordersData = useSelector((state) => state.orders.orders);
  let gRunnersData = useSelector((state) => state.gRunners.gRunners);

  useEffect(() => {
    let mount = true;
    // console.log('Search -> screenContext', screenContext);

    if (mount) {
      setSearchOrders(ordersData);
      setSearchGrunners(gRunnersData);

      screenContext === 'orders'
        ? setSearchableData(ordersData)
        : setSearchableData(gRunnersData);

      // searchFilterFunction(searchValue);
    }
    console.log('searchValue IN USEEFFECT', searchValue);

    // console.log('Search -> areSearchingGrunners', areSearchingGrunners);
    return () => (mount = false);
  }, [searchValue, searchableData, screenContext]);

  const searchFilterFunction = () => {
    // setSearchValue(text);
    console.log(
      'searchFilterFunction -> searchValue IN FILTER FUNC',
      searchValue
    );

    if (searchValue.length) {
      setAreSearchingOrders(true);
      setAreSearchingGrunners(true);
    } else {
      setAreSearchingOrders(false);
      setAreSearchingGrunners(false);
    }

    // console.log('Search -> searchableData', searchableData);

    var newData = searchableData.filter((item) => {
      // var condition1 = item.product_name
      //   .toLowerCase()
      //   .includes(searchValue.toLowerCase());
      // var condition2 = item.orderID.includes(searchValue.toUpperCase());
      // var condition3 = item.zone.includes(searchValue);

      // return condition1 || condition2 || condition3;
      let itemData;

      let pubID = item.public_courier_id
        ? item.public_courier_id.toUpperCase()
        : '';
      let first_name = item.first_name ? item.first_name.toUpperCase() : '';
      let last_name = item.last_name ? item.last_name.toUpperCase() : '';
      let current_zone = item.current_zone
        ? item.current_zone.toUpperCase()
        : '';
      let current_order = item.current_order
        ? item.current_order.toUpperCase()
        : '';

      const textData = searchValue.toUpperCase();

      if (screenContext === 'orders') {
        itemData = `${item.product_name.toUpperCase()}
        ${item.orderID.toUpperCase()}
        ${item.zone.toUpperCase()}`;
      } else if (screenContext === 'gRunners') {
        itemData = `${pubID} ${first_name} ${last_name} ${current_zone} ${current_order}`;
      }
      // ${item.first_name.toUpperCase()}
      // ${item.last_name.toUpperCase()}
      // ${item.current_zone.toUpperCase()}
      // ${item.current_order.toUpperCase()};

      return itemData.indexOf(textData) > -1;
    });
    console.log('Search -> searchValue BOTTOM OF FUNC', searchValue);

    screenContext === 'orders'
      ? setSearchOrders(newData)
      : setSearchGrunners(newData);
    // console.log('searchFilterFunction -> newData', filtered);
  };

  return (
    <ErrorBoundary>
      <View style={styles.inputContainer}>
        <ScrollView
          // onPress={() => {
          keyboardShouldPersistTaps='never'
          // Keyboard.dismiss();
          // search.blur();
          // }}
        >
          <SearchBar
            lightTheme
            round
            showLoadingIcon={true}
            containerStyle={styles.searchBar}
            inputStyle={styles.input}
            placeholder='Search...'
            style={styles.searchBar}
            onChangeText={searchFilterFunction}
            value={searchValue}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 340,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    overflow: 'hidden',
    marginTop: 6,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: Colors.searchGrey,
  },
  searchBar: {
    // width: '80%',
    backgroundColor: '#eee',
    // justifyContent: 'center',
  },
  input: {
    color: '#555',
    // backgroundColor: 'white',
    // height: 30,
  },
});

export default Search;
