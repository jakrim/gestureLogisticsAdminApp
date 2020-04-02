import React from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  Linking,
  Text,
  Button,
  Modal,
  View
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import LogoTitle from '../components/LogoTitle';
import StyledModal from '../components/StyledModal';
import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/AuthScreen';
import LoadingScreen from '../screens/LoadingScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import GRunnersScreen from '../screens/GRunnersScreen';
import GRunnerScreen from '../screens/GRunnerDetailsScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import PaymentOrderScreen from '../screens/PaymentOrderScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import {
  LogoComponent,
  OrdersStackComponent,
  LogoutComponent
} from './DrawerComponents';

const MainStack = createStackNavigator();
const StartupStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const GRunner = createStackNavigator();
const Drawer = createDrawerNavigator();

export const Startup = () => (
  <StartupStack.Navigator>
    <StartupStack.Screen name='StartupScreen' component={StartupScreen} />
  </StartupStack.Navigator>
);

export const Auth = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primaryColor,
        shadowColor: 'transparent',
        elevation: 0,
        height: 100
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 25,
        fontFamily: 'dm-sans-bold'
      }
    }}
  >
    <AuthStack.Screen
      name='Login'
      component={AuthScreen}
      style={{ height: 80 }}
    />
    <AuthStack.Screen
      name='LoadingScreen'
      component={LoadingScreen}
      options={{
        headerShown: false
      }}
    />
  </AuthStack.Navigator>
);

export const OrderStack = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerTintColor: Colors.primaryColor
    }}
  >
    <HomeStack.Screen
      name='Orders'
      component={OrdersScreen}
      options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerLeft: () => (
          <Ionicons
            style={styles.headerButtonLeft}
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
            size={25}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
        headerRight: () => <StyledModal style={styles.modalButton} />,
        headerStyle: {
          backgroundColor:
            Platform.OS === 'android' ? Colors.primaryColor : 'white',
          shadowColor: 'transparent',
          elevation: 0
        },
        // headerTitleAlign: 'center',
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor
      }}
    />
    <HomeStack.Screen
      name='OrderDetailsScreen'
      component={OrderDetailsScreen}
      options={{ headerTitle: 'Order Details' }}
    />
  </HomeStack.Navigator>
);

export const GRunnerStack = ({ navigation }) => (
  <GRunner.Navigator
    screenOptions={{
      headerTintColor: Colors.primaryColor
    }}
  >
    <GRunner.Screen
      name='GRunners'
      component={GRunnersScreen}
      options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerLeft: () => (
          <Ionicons
            style={styles.headerButtonLeft}
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
            size={25}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
        headerRight: () => (
          <Ionicons
            style={styles.headerButtonRight}
            name={Platform.OS === 'android' ? 'md-funnel' : 'md-funnel'}
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
            size={25}
            onPress={() => {
              return (
                <View>
                  <StyledModal />
                </View>
              );
            }}
          />
        ),
        headerStyle: {
          backgroundColor:
            Platform.OS === 'android' ? Colors.primaryColor : 'white',
          shadowColor: 'transparent',
          elevation: 0
        },
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor
      }}
    />
    <GRunner.Screen
      name='GRunner'
      component={GRunnerScreen}
      options={{ headerTitle: 'GRunner' }}
    />
    <GRunner.Screen
      name='PaymentHistoryScreen'
      component={PaymentHistoryScreen}
      options={{ headerTitle: 'Payment History' }}
    />
    <GRunner.Screen
      name='PaymentOrderScreen'
      component={PaymentOrderScreen}
      options={{ headerTitle: 'Order Details' }}
    />
  </GRunner.Navigator>
);

export const CustomDrawerContent = props => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

export const DrawerMenu = () => (
  <Drawer.Navigator
    drawerContent={props => (
      <View style={{ flex: 1, paddingTop: 60 }}>
        <LogoComponent {...props} />
        <CustomDrawerContent
          // contentContainerStyle={{}}
          {...props}
          // drawerIcon={({ focused, color, size }) => (
          //   <Ionicons color={color} size={size} name='ios-pin' />
          // )}
        />
        <LogoutComponent {...props} />
      </View>
    )}
    initialRouteName='OrderStack'
    drawerType='slide'
    drawerContentOptions={{
      activeTintColor: Colors.primaryColor,
      itemStyle: { paddingVertical: 10 },
      labelStyle: {
        fontSize: 18,
        fontFamily: 'dm-sans-boldItalic'
      }
    }}
  >
    <Drawer.Screen name='OrderStack' component={OrderStack} />
    <Drawer.Screen name='GRunnerStack' component={GRunnerStack} />
  </Drawer.Navigator>
);

export const MainNavigator = () => (
  <NavigationContainer>
    <MainStack.Navigator headerMode='none'>
      <MainStack.Screen name='StartupScreen' component={Startup} />
      <MainStack.Screen name='SignIn' component={Auth} />
      <MainStack.Screen name='OrderStack' component={DrawerMenu} />
    </MainStack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerButtonLeft: {
    paddingLeft: 15
  },
  headerButtonRight: {
    paddingRight: 15
  },
  modalButton: {
    paddingRight: 15
  }
});
