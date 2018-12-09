import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinkScreen from '../screens/LinkScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsNavigator from '../navigation/SettingsNavigator';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'AR',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-camera${focused ? '' : '-outline'}`
          : 'md-camera'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinkScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsNavigator,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-menu${focused ? '' : '-outline'}` : 'md-menu'}
    />
  ),
};

export default createBottomTabNavigator({
  LinksStack,
  HomeStack,
  SettingsStack,
});
