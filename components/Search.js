import React, { useState, useCallback, useContext } from 'react';
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

// import { Ionicons } from '@expo/vector-icons';
import ErrorBoundary, { throwError } from '../components/ErrorBoundary';
import Colors from '../constants/Colors';
import * as ordersActions from '../store/actions/orders';
import {
  OrdersSearchContext,
  AreSearchingOrders,
} from '../components/FiltersContext';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  // const [searching, setSearching] = useState(false);
  // const dispatch = useDispatch();

  let ordersData = useSelector((state) => state.orders.orders);
  const { searchOrders, setSearchOrders } = useContext(OrdersSearchContext);
  const { areSearchingOrders, setAreSearchingOrders } = useContext(
    AreSearchingOrders
  );

  setSearchOrders(ordersData);

  // console.log('searchFilterFunction -> searchOrders', searchOrders);
  // console.log('Search -> searchingOrders', searchingOrders);
  const searchFilterFunction = (text) => {
    setSearchValue(text);
    if (text.length) {
      setAreSearchingOrders(true);
    } else {
      setAreSearchingOrders(false);
    }
    const newData = searchOrders.filter((item) => {
      // console.log(
      //   'searchFilterFunction -> item.product_name',
      //   item.product_name
      // );
      if (
        !item.product_name.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return false;
      }
      // if (!item.order_ID.includes(searchValue)) {
      //   return false;
      // }
      // if (!item.category_name.includes(searchValue)) {
      //   return false;
      // }
      // if (!item.zone.includes(searchValue)) {
      //   return false;
      // }

      // const itemData = `${item.name.title.toUpperCase()}
      // ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;

      // const textData = text.toUpperCase();

      // return itemData.indexOf(textData) > -1;
      return true;
    });

    // console.log('searchFilterFunction -> newData', newData);
    setSearchOrders(newData);
    console.log('searchFilterFunction -> newData', newData);
  };

  // const handleTextChange = useCallback((text) => {
  //   try {
  //     setSearchValue(text);
  //     dispatch(ordersActions.searchText(searchValue));
  //   } catch (err) {
  //     throwError(new Error('Asynchronous error', err));
  //   }
  // }, []);

  return (
    <ErrorBoundary>
      <View style={styles.inputContainer}>
        <ScrollView
          // onPress={() => {
          keyboardShouldPersistTaps='handled'
          // Keyboard.dismiss();
          // search.blur();
          // }}
        >
          {/* <Ionicons name='ios-search' />
          <TextInput
            placeholder='Search...'
            style={styles.input}
            onChangeText={(text) => handleTextChange(text)}
            value={searchValue}
          /> */}
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
