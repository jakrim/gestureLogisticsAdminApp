import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';

import * as gRunnerActions from '../store/actions/gRunner';
import GrunnerItem from '../components/GrunnerItem';
import Colors from '../constants/Colors';

const GRunnersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const gRunners = useSelector(state => state.gRunners.gRunners);
  console.log('gRunners', gRunners);
  const dispatch = useDispatch();

  const { navigation } = props;

  const loadGrunners = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(gRunnerActions.fetchGrunners());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadGrunners);

    return willFocusSub;
  }, [navigation, loadGrunners]);

  useEffect(() => {
    setIsLoading(true);
    loadGrunners().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadGrunners]);

  const selectItemHandler = uid => {
    navigation.navigate('GRunner', {
      uid
    });
  };

  if (error) {
    return (
      <LinearGradient
        colors={[Colors.primaryColor, Colors.lightTeal]}
        style={styles.gradient}
      >
        <View style={styles.centered}>
          <Text
            style={{
              fontSize: 20,
              color: Colors.darkPurp
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
    );
  }

  if (isLoading) {
    return (
      <LinearGradient
        colors={[Colors.primaryColor, Colors.lightTeal]}
        style={styles.gradient}
      >
        <View style={styles.centered}>
          <BallIndicator color={Colors.backgroundFeed} />
        </View>
      </LinearGradient>
    );
  }

  if (!isLoading && gRunners.length === 0) {
    return (
      <LinearGradient
        colors={[Colors.primaryColor, Colors.lightTeal]}
        style={styles.gradient}
      >
        <View style={styles.centered}>
          <Text>No G-runners found!</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primaryColor, Colors.lightTeal]}
      style={styles.gradient}
    >
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
        onRefresh={loadGrunners}
        refreshing={isRefreshing}
        data={gRunners}
        keyExtractor={item => `${item.uid}`}
        renderItem={itemData => (
          <GrunnerItem
            uid={itemData.item.uid}
            public_courier_id={itemData.item.public_courier_id}
            os={itemData.item.os}
            full_name={itemData.item.first_name.concat(
              ' ' + itemData.item.last_name
            )}
            current_zone={itemData.item.current_zone}
            current_status={itemData.item.current_status}
            current_order={itemData.item.current_order}
            onSelect={() => {
              selectItemHandler(itemData.item.uid);
            }}
          ></GrunnerItem>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default GRunnersScreen;
