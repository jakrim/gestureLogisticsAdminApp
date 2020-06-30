import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Text, View, Button, FlatList, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
var _ = require('lodash');

import LogoTitle from '../components/LogoTitle';
import GRunnerModal from '../components/GRunnerModal';
import { Ionicons } from '@expo/vector-icons';
import * as gRunnerActions from '../store/actions/gRunner';
import ErrorBoundary, { throwError } from '../components/ErrorBoundary';
import StyledButton from '../components/StyledButton';
import GrunnerItem from '../components/GrunnerItem';
import Search from '../components/Search';
import Colors from '../constants/Colors';
import {
  GrunnerFiltersContext,
  ScreenContext,
  GRunnersSearchContext,
  AreSearching,
} from '../components/ApplicationContexts';
import { capitalizeLetter } from '../components/HelperFunctions';

let noFilters = {
  hasOrder: false,
  isCity: false,
  cities: [],
  filter: 'noFilter',
};

const GRunnersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [hasFilters, setHasFilters] = useState(false);
  const dispatch = useDispatch();
  let gRunners = useSelector((state) => state.gRunners.gRunners);

  const { gfilters, setGFilters } = useContext(GrunnerFiltersContext);
  const { screenContext, setScreenContext } = useContext(ScreenContext);
  const { searchGrunners, setSearchGrunners } = useContext(
    GRunnersSearchContext
  );
  const { areSearching, setAreSearching } = useContext(AreSearching);

  const { navigation } = props;

  useEffect(() => {
    if (areSearching === false) {
      setSearchGrunners(gRunners);
    } else {
      setSearchGrunners(searchGrunners);
    }
  }, [areSearching, searchGrunners]);

  const loadGrunners = useCallback(async () => {
    let loadGrunnersMount = true;
    if (loadGrunnersMount) {
      setError(null);
      setIsRefreshing(true);
      setScreenContext('gRunners');
      try {
        if (_.isEqual(gfilters, noFilters)) {
          setHasFilters(false);
        } else {
          setHasFilters(true);
        }
        await dispatch(gRunnerActions.fetchGrunners(gfilters));
        await dispatch(gRunnerActions.fetchZones());
      } catch (err) {
        setError(err.message);
      }
      setIsRefreshing(false);
    }
    return () => (loadGrunnersMount = false);
  }, [dispatch, gfilters]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      navigation.addListener('focus', loadGrunners);
    }

    return () => (mount = false);
  }, [navigation, loadGrunners]);

  useEffect(() => {
    let effect = true;
    if (effect) {
      setIsLoading(true);
      loadGrunners()
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          throwError(new Error('Asynchronous error'));
        });
    }
    return () => (effect = false);
  }, [dispatch, loadGrunners]);

  const handleResetButton = () => {
    setGFilters(noFilters);
  };

  if (error) {
    return (
      <ErrorBoundary>
        <View style={styles.centered}>
          <Text
            style={{
              fontSize: 20,
              color: Colors.accentColor,
            }}
          >
            An error occurred!
          </Text>
          {!isLoading ? (
            <Button
              title='Press to try again'
              onPress={loadGrunners}
              color={Colors.primaryColor}
            />
          ) : (
            <BallIndicator color={Colors.primaryColor} />
          )}
        </View>
      </ErrorBoundary>
    );
  }

  if (isLoading) {
    return (
      <ErrorBoundary>
        <View style={styles.centered}>
          <BallIndicator color={Colors.primaryColor} />
        </View>
      </ErrorBoundary>
    );
  }

  if (!isLoading && gRunners.length === 0) {
    return (
      <ErrorBoundary>
        <View style={styles.centered}>
          <Text style={styles.errorText}>
            <Text style={{ fontSize: 22, fontFamily: 'dm-sans-bold' }}>
              No G Runners:
            </Text>{' '}
            {'\n'}
            Check your filters on the top right!
          </Text>
        </View>
      </ErrorBoundary>
    );
  }

  const selectItemHandler = (uid) => {
    navigation.navigate('GRunner', {
      uid,
    });
  };

  return (
    <ErrorBoundary>
      <Search />
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
        showsVerticalScrollIndicator={false}
        onRefresh={loadGrunners}
        initialNumToRender={searchGrunners.length}
        refreshing={isRefreshing}
        highermaxToRenderPerBatch={5}
        data={searchGrunners}
        keyExtractor={(gRunner) => gRunner.uid}
        style={{ flex: 0 }}
        renderItem={(itemData) => (
          <GrunnerItem
            public_courier_id={itemData.item.public_courier_id}
            os={itemData.item.os}
            full_name={
              itemData.item.first_name && itemData.item.last_name
                ? capitalizeLetter(itemData.item.first_name) +
                  ' ' +
                  capitalizeLetter(itemData.item.last_name)
                : itemData.item.first_name
                ? capitalizeLetter(itemData.item.first_name) + ' '
                : itemData.item.last_name
                ? capitalizeLetter(itemData.item.last_name)
                : null
            }
            current_zone={itemData.item.current_zone}
            current_status={itemData.item.current_status}
            current_order={itemData.item.current_order}
            onSelect={() => {
              selectItemHandler(itemData.item.uid);
            }}
          ></GrunnerItem>
        )}
      />
      {hasFilters && (
        <View style={styles.resetButtonContainer}>
          <StyledButton style={styles.resetButton} onPress={handleResetButton}>
            Reset Filters
          </StyledButton>
        </View>
      )}
    </ErrorBoundary>
  );
};

export const gRunnersScreenHeaderOptions = (props) => {
  return {
    headerTitle: (props) => <LogoTitle {...props} />,
    headerLeft: () => (
      <Ionicons
        style={styles.headerButtonLeft}
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        color={Platform.OS === 'android' ? 'white' : 'white'}
        size={25}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: () => <GRunnerModal style={styles.modalButton} />,
    headerStyle: {
      backgroundColor:
        Platform.OS === 'android' ? Colors.primaryColor : Colors.primaryColor,
      shadowColor: 'transparent',
      elevation: 0,
    },
    // headerTitleAlign: 'center',
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  };
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    color: Colors.backgroundFeed,
    padding: 10,
  },
  resetButtonContainer: {
    paddingTop: 5,
    paddingBottom: 20,
  },
  resetButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    color: Colors.accentColor,
    fontSize: 20,
    width: 200,
  },
  headerButtonLeft: {
    paddingLeft: 15,
  },
  headerButtonRight: {
    paddingRight: 15,
  },
  modalButton: {
    paddingRight: 15,
  },
});

export default GRunnersScreen;
