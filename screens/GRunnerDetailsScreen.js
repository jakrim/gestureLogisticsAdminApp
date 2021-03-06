import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { BallIndicator } from "react-native-indicators";
import { Ionicons } from "@expo/vector-icons";

import * as gRunnerActions from "../store/actions/gRunner";
import ErrorBoundry, { throwError } from "../components/ErrorBoundary";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import StyledButton from "../components/StyledButton";
import { capitalizeLetter } from "../components/HelperFunctions";

const windowWidth = Dimensions.get("window").width;

const B = (props) => (
  <Text {...props} style={{ fontFamily: "dm-sans-bold", ...props.style }}>
    {props.children}
  </Text>
);

const GRunnerDetailsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const gRunner = useSelector((state) => state.gRunners.gRunner);

  const { route, navigation } = props;
  const uid = route.params.uid;

  const loadGrunner = useCallback(async () => {
    // setIsLoading(true);
    let effect = true;
    if (effect) {
      setError(null);
      try {
        await dispatch(gRunnerActions.fetchGrunner(uid));
      } catch (err) {
        setError(err.message);
        // setIsLoading(false);
      }
    }
    return () => (effect = false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      navigation.addListener("focus", loadGrunner);
    }

    return () => (mount = false);
  }, [navigation, loadGrunner]);

  useEffect(() => {
    let effect = true;
    if (effect) {
      setIsLoading(true);
      loadGrunner()
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          throwError(new Error("Asynchronous error"));
        });
    }
    return () => (effect = false);
  }, [dispatch, loadGrunner, setIsLoading]);

  if (error) {
    return (
      <ErrorBoundry>
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
                title="Try again"
                onPress={loadGrunner}
                color={Colors.LightColorText}
              />
            ) : (
              <BallIndicator color={Colors.LightColorText} />
            )}
          </View>
        </LinearGradient>
      </ErrorBoundry>
    );
  }

  if (isLoading) {
    return (
      <ErrorBoundry>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
          <View style={styles.centered}>
            <BallIndicator color={Colors.backgroundFeed} />
          </View>
        </LinearGradient>
      </ErrorBoundry>
    );
  }

  const selectItemHandler = (courierId) => {
    navigation.navigate("PaymentHistoryScreen", {
      courierId,
    });
  };

  let full_name =
    capitalizeLetter(gRunner.firstName) +
    " " +
    capitalizeLetter(gRunner.lastName);

  return (
    <ErrorBoundry>
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
            <Text style={styles.gRunnerName}>{full_name}</Text>
            {gRunner.currentStatus === "online" ? (
              <View style={styles.status}>
                <Text
                  style={{
                    color: "green",
                    textAlign: "center",
                    fontFamily: "dm-sans-boldItalic",
                    paddingTop: 4,
                    fontSize: 18,
                  }}
                >
                  {gRunner.currentStatus}
                </Text>
              </View>
            ) : gRunner.currentStatus === "offline" ? (
              <View style={styles.status}>
                <Text
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontFamily: "dm-sans-bold",
                    paddingTop: 4,
                    fontSize: 18,
                  }}
                >
                  {gRunner.currentStatus}
                </Text>
              </View>
            ) : (
              <View style={styles.status}>
                <Text
                  style={{
                    color: Colors.accentColor,
                    textAlign: "center",
                    fontFamily: "dm-sans-bold",
                    paddingTop: 4,
                    fontSize: 18,
                  }}
                >
                  {gRunner.currentStatus}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              {gRunner.isLock ? (
                <Ionicons
                  name={Platform.OS === "android" ? "md-lock" : "ios-lock"}
                  size={20}
                  color={Colors.delayRed}
                />
              ) : (
                <Ionicons
                  name={Platform.OS === "android" ? "md-unlock" : "ios-unlock"}
                  size={20}
                  color="green"
                />
              )}
              {gRunner.isLock ? (
                <Text style={(styles.isLock, { color: Colors.delayRed })}>
                  {" "}
                  Locked
                </Text>
              ) : (
                <Text style={(styles.isLock, { color: "green" })}>
                  {" "}
                  Unlocked
                </Text>
              )}
            </View>
            <Text style={styles.description}>
              <B style={{ color: "black", fontSize: 14 }}>
                Public Courier id:{" "}
              </B>
              {gRunner.publicCourierId}
            </Text>
            <View style={styles.buttonContainer}>
              <StyledButton
                style={styles.button}
                onPress={() => {
                  selectItemHandler(gRunner.courierId);
                }}
              >
                Payment History
              </StyledButton>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </ErrorBoundry>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  card: {
    flex: 1,
    padding: 10,
    width: windowWidth - 20,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    // borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 10,
  },
  gRunnerName: {
    textAlign: "center",
    fontFamily: "dm-sans-regular",
    fontSize: 20,
    color: "black",
  },
  status: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  isLock: {
    fontSize: 18,
    fontFamily: "dm-sans-regular",
    padding: 10,
  },
  description: {
    fontFamily: "dm-sans-regular",
    paddingTop: 5,
    fontSize: 18,
    marginHorizontal: 10,
    color: "black",
  },
  buttonContainer: {
    paddingVertical: 100,
  },
  button: {
    //
  },
});

export default GRunnerDetailsScreen;
