import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';

import LogoTitle from '../components/LogoTitle';
import GRunnerModal from '../components/GRunnerModal';
import { Ionicons } from '@expo/vector-icons';
import * as gRunnerActions from '../store/actions/gRunner';
import ErrorBoundary from '../components/ErrorBoundary';
import GrunnerItem from '../components/GrunnerItem';
import Colors from '../constants/Colors';

import { capitalizeLetter } from '../components/HelperFunctions';

const GRunnersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const gRunners = useSelector((state) => state.gRunners.gRunners);

  const { navigation } = props;

  const loadGrunners = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(gRunnerActions.fetchGrunners());
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      navigation.addListener('focus', loadGrunners);
    }

    return () => (mount = false);
  }, [navigation, loadGrunners]);

  useEffect(() => {
    setIsLoading(true);
    loadGrunners().then(() => {
      setIsLoading(false);
    });
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
                color: Colors.darkPurp,
              }}
            >
              An error occurred!
            </Text>
            {!isLoading ? (
              <Button
                title='Try again'
                onPress={loadGrunners}
                color={Colors.LightColorText}
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

  // useMemo(() => {
  return (
    <ErrorBoundary>
      <LinearGradient
        colors={[Colors.primaryColor, Colors.lightTeal]}
        style={styles.gradient}
      >
        <FlatList
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
                    ? capitalizeLetter(itemData.item.first_name)
                    : itemData.item.last_name
                    ? capitalizeLetter(itemData.item.last_name)
                    : ''
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
