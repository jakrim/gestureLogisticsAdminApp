import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';

import LogoTitle from '../components/LogoTitle';
import GRunnerModal from '../components/GRunnerModal';
import { Ionicons } from '@expo/vector-icons';
import * as gRunnerActions from '../store/actions/gRunner';
import ErrorBoundary, { throwError } from '../components/ErrorBoundary';
import GrunnerItem from '../components/GrunnerItem';
import Search from '../components/Search';
import Colors from '../constants/Colors';
import { GrunnerFiltersContext } from '../components/FiltersContext';
import { capitalizeLetter } from '../components/HelperFunctions';

const GRunnersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const gRunners = useSelector((state) => state.gRunners.gRunners);

  const { gfilters } = useContext(GrunnerFiltersContext);

  const { navigation } = props;

  const loadGrunners = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      setIsLoading(true);
      await dispatch(gRunnerActions.fetchZones())
        .then(() => {
          dispatch(gRunnerActions.fetchGrunners(gfilters));
        })
        .catch((err) => console.log(err));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [dispatch, gfilters, setIsLoading, setIsRefreshing, setError]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      navigation.addListener('focus', loadGrunners);
    }

    return () => {
      mount = false;
    };
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
  }, [dispatch, loadGrunners, setIsLoading]);

  const selectItemHandler = (uid) => {
    navigation.navigate('GRunner', {
      uid,
    });
  };

  if (error) {
    return (
      <ErrorBoundary>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
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
                color={Colors.backgroundFeed}
              />
            ) : (
              <BallIndicator color={Colors.LightColorText} />
            )}
          </View>
        </LinearGradient>
      </ErrorBoundary>
    );
  }

  if (isLoading) {
    return (
      <ErrorBoundary>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
          <View style={styles.centered}>
            <BallIndicator color={Colors.backgroundFeed} />
          </View>
        </LinearGradient>
      </ErrorBoundary>
    );
  }

  if (!isLoading && gRunners.length === 0) {
    return (
      <ErrorBoundary>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
          <View style={styles.centered}>
            <Text style={styles.errorText}>
              <Text style={{ fontSize: 22, fontFamily: 'dm-sans-bold' }}>
                No G Runners:
              </Text>{' '}
              {'\n'}
              Check your filters on the top right!
            </Text>
          </View>
        </LinearGradient>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <LinearGradient
        colors={[Colors.primaryColor, Colors.lightTeal]}
        style={styles.gradient}
      >
        <Search />
        <OptimizedFlatList
          scrollIndicatorInsets={{ right: 1 }}
          showsVerticalScrollIndicator={false}
          onRefresh={loadGrunners}
          initialNumToRender={10}
          refreshing={isRefreshing}
          data={gRunners}
          keyExtractor={(gRunner) => gRunner.uid}
          renderItem={(itemData) => {
            return (
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
            );
          }}
        />
      </LinearGradient>
    </ErrorBoundary>
  );
  // });
};

export const gRunnersScreenHeaderOptions = (props) => {
  return {
    headerTitle: (props) => <LogoTitle {...props} />,
    headerLeft: () => (
      <Ionicons
        style={styles.headerButtonLeft}
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
        size={25}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: () => <GRunnerModal style={styles.modalButton} />,
    headerStyle: {
      backgroundColor:
        Platform.OS === 'android' ? Colors.primaryColor : 'white',
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
