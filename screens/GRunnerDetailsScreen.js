import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import { Ionicons } from '@expo/vector-icons';

import * as gRunnerActions from '../store/actions/gRunner';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import MainButton from '../components/ButtonStyle';

const B = props => (
  <Text {...props} style={{ fontFamily: 'dm-sans-bold', ...props.style }}>
    {props.children}
  </Text>
);

const GRunnerDetailsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const gRunner = useSelector(state => state.gRunners.gRunner);

  const { route, navigation } = props;
  const uid = route.params.uid;

  const loadGrunner = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(gRunnerActions.fetchGrunner(uid));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadGrunner);

    return willFocusSub;
  }, [navigation, loadGrunner]);

  useEffect(() => {
    setIsLoading(true);
    loadGrunner()
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => console.log(`ERR in GDetailsScreen`, err));
  }, [dispatch, loadGrunner, setIsLoading]);

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
              onPress={loadGrunner}
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

  return (
    <LinearGradient
      colors={[Colors.primaryColor, Colors.lightTeal]}
      style={styles.gradient}
    >
      <Card style={styles.card}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: gRunner.profileImageUrl }}
            />
          </View>
          <Text style={styles.gRunnerName}>
            {gRunner.firstName} {gRunner.lastName}
          </Text>
          {gRunner.currentStatus === 'online' ? (
            <View style={styles.status}>
              {/* <Ionicons
                name={
                  Platform.OS === 'android'
                    ? 'md-radio-button-on'
                    : 'ios-radio-button-on'
                }
                size={20}
                color='black'
              /> */}
              <Text
                style={{
                  color: 'green',
                  textAlign: 'center',
                  fontFamily: 'dm-sans-boldItalic',
                  paddingTop: 4,
                  fontSize: 18
                }}
              >
                {gRunner.currentStatus}
              </Text>
            </View>
          ) : (
            <View style={styles.status}>
              {/* <Ionicons
                name={
                  Platform.OS === 'android'
                    ? 'md-radio-button-off'
                    : 'ios-radio-button-off'
                }
                size={20}
                color='black'
              /> */}
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontFamily: 'dm-sans-bold',
                  padding: 4,
                  fontSize: 18
                }}
              >
                {gRunner.currentStatus}
              </Text>
            </View>
          )}
          <Text style={styles.description}>{gRunner.isLock}</Text>
          <Text style={styles.description}>
            <B style={{ color: 'black', fontSize: 14 }}>CID: </B>
            {gRunner.publicCourierId}
          </Text>
          <View style={styles.buttonContainer}>
            <MainButton
              style={styles.button}
              onPress={() => {
                navigation.navigate('PaymentHistoryScreen');
              }}
            >
              Payment History
            </MainButton>
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  card: {
    flex: 1,
    padding: 10,
    width: 350
  },
  imageContainer: {
    alignItems: 'center'
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    // borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 10
  },
  gRunnerName: {
    textAlign: 'center',
    fontFamily: 'dm-sans-regular',
    fontSize: 20,
    color: Colors.primaryColor
  },
  status: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },
  description: {
    fontFamily: 'dm-sans-regular',
    paddingTop: 30,
    fontSize: 18,
    marginHorizontal: 20,
    color: Colors.primaryColor
  },
  buttonContainer: {
    paddingVertical: 100
  },
  button: {
    //
  }
});

export default GRunnerDetailsScreen;
