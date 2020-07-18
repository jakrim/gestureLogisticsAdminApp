import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
var _ = require('lodash');

import ErrorBoundary, { throwError } from '../components/ErrorBoundary';
import {
  OrdersSearchContext,
  AreSearching,
  ScreenContext,
  GRunnersSearchContext,
  AscendingData,
} from './ApplicationContexts';

const windowWidth = Dimensions.get('window').width;

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchableData, setSearchableData] = useState();
  const { ascending, setAscending } = useContext(AscendingData);
  const { screenContext, setScreenContext } = useContext(ScreenContext);
  const { searchOrders, setSearchOrders } = useContext(OrdersSearchContext);
  const { searchGrunners, setSearchGrunners } = useContext(
    GRunnersSearchContext
  );
  const { areSearching, setAreSearching } = useContext(AreSearching);
  let ordersData = useSelector((state) => state.orders.orders);
  let gRunnersData = useSelector((state) => state.gRunners.gRunners);

  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

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

  const searchFilterFunction = useCallback(() => {
    if (searchValue.length) {
      setAreSearching(true);
    } else {
      setAreSearching(false);
    }
    if (searchableData) {
      var newData = searchableData.filter((item) => {
        let itemData;

        // Abstraction for searching through G Runners
        let pubID = item.public_courier_id
          ? item.public_courier_id.toUpperCase()
          : '';
        let first_name = item.first_name ? item.first_name.toUpperCase() : '';
        let last_name = item.last_name ? item.last_name.toUpperCase() : '';
        let current_order = item.current_order
          ? item.current_order.toUpperCase()
          : '';

        const textData = searchValue.toUpperCase();

        if (screenContext === 'orders') {
          itemData = `${item.product_name.toUpperCase()}
          ${item.orderID.toUpperCase()}
          ${item.address_string.toUpperCase()}`;
        } else if (screenContext === 'gRunners') {
          itemData = `${pubID} ${first_name} ${last_name} ${current_order}`;
        }

        return itemData.indexOf(textData) > -1;
      });

      if (screenContext === 'orders') {
        setSearchOrders(newData);
      } else if (screenContext === 'gRunners') {
        console.log('here in newData');
        setSearchGrunners(newData);
      }
    }
  }, [
    searchValue,
    searchableData,
    areSearching,
    screenContext,
    searchOrders,
    searchGrunners,
  ]);

  useEffect(() => {
    if (searchValue.length) {
      searchFilterFunction(searchValue);
    } else {
      if (screenContext === 'orders') {
        setSearchOrders(ordersData);
      } else if (screenContext === 'gRunners') {
        setSearchGrunners(gRunnersData);
      }
    }
  }, [searchValue]);

  const ascendingOrderButton = () => {
    setAscending(!ascending);
  };

  useEffect(() => {
    if (ascending) {
      if (screenContext === 'orders') {
        setSearchOrders(searchOrders.sort((a, b) => a > b));
      } else if (screenContext === 'gRunners') {
        setSearchGrunners(searchGrunners.sort((a, b) => a > b));
      }
    } else if (!ascending) {
      if (screenContext === 'orders') {
        setSearchOrders(searchOrders.sort((a, b) => a < b));
      } else if (screenContext === 'gRunners') {
        setSearchGrunners(searchGrunners.sort((a, b) => a < b));
      }
    }
  }, [ascending]);

  return (
    <ErrorBoundary>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <SearchBar
            lightTheme
            round
            showLoadingIcon={true}
            containerStyle={styles.searchBar}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainerStyle}
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
        </View>
        {screenContext === 'orders' ? (
          <TouchableComp style={styles.orderBox} onPress={ascendingOrderButton}>
            <Ionicons
              name={ascending ? 'ios-arrow-up' : 'ios-arrow-down'}
              size={22}
              color='black'
              style={styles.iconStyle}
            />
          </TouchableComp>
        ) : (
          <></>
        )}
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: windowWidth / 1.4,
    borderWidth: 0.5,
    borderColor: 'black',
    overflow: 'hidden',
    marginTop: 6,
    marginBottom: 2,
    borderRadius: 8,
  },
  inputContainerStyle: {
    backgroundColor: '#eee',
    height: 30,
  },
  searchBar: {
    width: windowWidth / 1.4,
    backgroundColor: '#eee',
    padding: 4,
  },
  input: {
    backgroundColor: '#eee',
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingBottom: 4,
  },
  orderBox: {
    backgroundColor: '#eee',
    borderColor: Platform.OS === 'ios' ? null : '#555',
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default Search;
