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
  const [searchableData, setSearchableData] = useState();
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
    if (mount) {
      setSearchOrders(ordersData);
      setSearchGrunners(gRunnersData);

      screenContext === 'orders'
        ? setSearchableData(searchOrders)
        : setSearchableData(searchGrunners);
      console.log('searchFilterFunction -> searchableData', searchableData);
    }

    return () => (mount = false);
  }, [searchableData, screenContext]);

  // useEffect(() => {
  //   let mount = true;
  //   if (mount) {
  const searchFilterFunction = useCallback(
    (text) => {
      setSearchValue(text);

      if (searchValue.length) {
        setAreSearchingOrders(true);
        setAreSearchingGrunners(true);
      } else {
        setAreSearchingOrders(false);
        setAreSearchingGrunners(false);
      }
      // console.log('Search -> searchValue', searchValue);

      var newData = searchableData.filter((item) => {
        let itemData;

        let pubID = item.public_courier_id
          ? item.public_courier_id.toUpperCase()
          : false;
        let first_name = item.first_name
          ? item.first_name.toUpperCase()
          : false;
        let last_name = item.last_name ? item.last_name.toUpperCase() : false;
        let current_zone = item.current_zone
          ? item.current_zone.toUpperCase()
          : false;
        let current_order = item.current_order
          ? item.current_order.toUpperCase()
          : false;

        const textData = searchValue.toUpperCase();

        if (screenContext === 'orders') {
          itemData = `${item.product_name.toUpperCase()}
            ${item.orderID.toUpperCase()}
            ${item.zone.toUpperCase()}`;
        } else if (screenContext === 'gRunners') {
          console.log('here in filter');
          2;
          itemData = `${pubID} ${first_name} ${last_name} ${current_zone} ${current_order}`;
        }

        return itemData.indexOf(textData) > -1;
      });

      screenContext === 'orders'
        ? setSearchOrders(newData)
        : setSearchGrunners(newData) && console.log('here in setting new data');
    },
    [
      searchValue,
      searchableData,
      areSearchingOrders,
      screenContext,
      areSearchingGrunners,
    ]
  );
  //     searchFilterFunction(searchValue);
  //   }

  //   return () => (mount = false);
  // }, [searchValue,
  //     searchableData,
  //     areSearchingOrders,
  //     screenContext,
  //     areSearchingGrunners,]);

  const handleChange = (text) => {
    setSearchValue(text);
    searchFilterFunction(text);
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
            onChangeText={handleChange}
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
