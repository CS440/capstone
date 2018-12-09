import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { StackNavigator } from 'react-navigation';



export default class App extends React.Component { 
 render() {

 {/* The app navigator allows pages of the app to be connected*/}
    return <AppNavigator />
    }
}
