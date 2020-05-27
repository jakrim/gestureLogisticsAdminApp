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
} from '../components/FiltersContext';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');

  let ordersData = useSelector((state) => state.orders.orders);
  const { searchOrders, setSearchOrders } = useContext(OrdersSearchContext);
  const { areSearchingOrders, setAreSearchingOrders } = useContext(
    AreSearchingOrders
  );

  useEffect(() => {
    let mount = true;

    if (mount) {
      setSearchOrders(ordersData);
      searchFilterFunction(searchValue);
    }

    return () => (mount = false);
  }, [searchValue, ordersData]);

  const searchFilterFunction = async (text) => {
    setSearchValue(text);

    await setSearchValue(text);
    if (searchValue.length) {
      setAreSearchingOrders(true);
    } else {
      setAreSearchingOrders(false);
    }

    var filtered = searchOrders.filter((item) => {
      var condition1 = item.product_name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      var condition2 = item.orderID.includes(searchValue.toUpperCase());
      var condition3 = item.zone.includes(searchValue);

      return condition1 || condition2 || condition3;
    });
    console.log('Search -> searchValue', searchValue);

    setSearchOrders(filtered);
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
            onChangeText={(text) => searchFilterFunction(text)}
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
