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
  AreSearching,
  ScreenContext,
  GRunnersSearchContext,
} from './ApplicationContexts';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchableData, setSearchableData] = useState();
  const { screenContext, setScreenContext } = useContext(ScreenContext);
  const { searchOrders, setSearchOrders } = useContext(OrdersSearchContext);
  const { searchGrunners, setSearchGrunners } = useContext(
    GRunnersSearchContext
  );
  const { areSearching, setAreSearching } = useContext(AreSearching);
  let ordersData = useSelector((state) => state.orders.orders);
  let gRunnersData = useSelector((state) => state.gRunners.gRunners);
  // console.log('Search -> gRunnersData', gRunnersData);

  useEffect(() => {
    let mount = true;
    if (mount) {
      setSearchOrders(ordersData);
      setSearchGrunners(gRunnersData);

      if (screenContext === 'orders') {
        setSearchableData(searchOrders);
      } else if (screenContext === 'gRunners') {
        setSearchableData(searchGrunners);
      }
    }

    return () => (mount = false);
  }, [searchableData, screenContext]);

  // useEffect(() => {
  //   let mount = true;
  //   if (mount) {
  const searchFilterFunction = useCallback(() => {
    if (searchValue.length) {
      setAreSearching(true);
    } else {
      setAreSearching(false);
    }
    if (searchableData) {
      var newData = searchableData.filter((item) => {
        let itemData;

        let pubID = item.public_courier_id
          ? item.public_courier_id.toUpperCase()
          : '';
        let first_name = item.first_name ? item.first_name.toUpperCase() : '';
        let last_name = item.last_name ? item.last_name.toUpperCase() : false;
        // let current_zone = item.current_zone
        //   ? item.current_zone.toUpperCase()
        //   : '';
        let current_order = item.current_order
          ? item.current_order.toUpperCase()
          : '';

        const textData = searchValue.toUpperCase();

        if (screenContext === 'orders') {
          itemData = `${item.product_name.toUpperCase()}
          ${item.orderID.toUpperCase()}
          ${item.zone.toUpperCase()}`;
        } else if (screenContext === 'gRunners') {
          itemData = `${pubID} ${first_name} ${last_name} ${current_order}`;
          // itemData = `${item.public_courier_id.toUpperCase()} ${item.first_name.toUpperCase()} ${item.last_name.toUpperCase()} ${item.current_order.toUpperCase()}`;
        }

        return itemData.indexOf(textData) > -1;
      });
    }

    if (screenContext === 'orders') {
      setSearchOrders(newData);
    } else if (screenContext === 'gRunners') {
      setSearchGrunners(newData);
    }
  }, [
    searchValue,
    searchableData,
    areSearching,
    screenContext,
    searchOrders,
    searchGrunners,
  ]);
  //     searchFilterFunction(searchValue);
  //   }

  //   return () => (mount = false);
  // }, [searchValue,
  //     searchableData,
  //     areSearchingOrders,
  //     screenContext,
  //     areSearchingGrunners,]);
  useEffect(() => {
    // const handleChange = async (text) => {
    if (searchValue) {
      searchFilterFunction(searchValue);
    }
    // };
  }, [searchValue]);

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
            onChangeText={(text) => setSearchValue(text)}
            onClear={() => {
              screenContext === 'orders'
                ? setSearchOrders(ordersData)
                : setSearchGrunners(gRunnersData);
            }}
            cancelIcon={false}
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
