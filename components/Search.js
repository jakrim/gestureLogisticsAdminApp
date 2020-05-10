import React, { useState, useCallback } from 'react';
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
import { useDispatch } from 'react-redux';

// import { Ionicons } from '@expo/vector-icons';
import ErrorBoundary, { throwError } from '../components/ErrorBoundary';
import Colors from '../constants/Colors';
import * as ordersActions from '../store/actions/orders';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  // const handleTextChange = (text) => {
  //   setSearchValue(text);
  //   dispatch(ordersActions.searchText(searchValue));
  // };

  const handleTextChange = useCallback((text) => {
    try {
      setSearchValue(text);
      dispatch(ordersActions.searchText(searchValue));
    } catch (err) {
      throwError(new Error('Asynchronous error', err));
    }
  }, []);

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
          <SearchBar
            lightTheme
            round
            showLoadingIcon={true}
            containerStyle={styles.searchBar}
            inputStyle={styles.input}
            placeholder='Search...'
            style={styles.searchBar}
            onChangeText={(text) => handleTextChange(text)}
            value={searchValue}
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
  },
});

export default Search;
