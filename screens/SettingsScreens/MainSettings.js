import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    Platform
} from 'react-native';
import { Icon } from 'expo';

class MainSettings extends Component {
   
    // Giving functionality to 'AboutACHS' button and navigate to that specific page
    handleAboutNavigation = () => {
        this.props.navigation.navigate('AboutScreen')
    }

    // displaying all button options in the settings page
    render() {
        return [
            
            <TouchableHighlight onPress={() => this.handleAboutNavigation()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
                <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
                    Platform.OS === 'ios'
                    ? 'ios-information-circle-outline'
                    : 'md-information-circle'
                }  size={40}></Icon.Ionicons>  About the ACHS</Text>
            </TouchableHighlight>,

            <TouchableHighlight onPress={() => this.handleAddEvent()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
                <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
                    Platform.OS === 'ios'
                    ? 'ios-compass-outline'
                    : 'md-compass'
                } size={40}></Icon.Ionicons>  Setting 2</Text>
            </TouchableHighlight>,

            <TouchableHighlight onPress={() => this.handleAddEvent()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
                <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
                    Platform.OS === 'ios'
                    ? 'ios-download-outline'
                    : 'md-download'
                } size={40}></Icon.Ionicons>   Setting 3</Text>
            </TouchableHighlight>,

            <TouchableHighlight onPress={() => this.handleAddEvent()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
                <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
                    Platform.OS === 'ios'
                    ? 'ios-hammer-outline'
                    : 'md-hammer'
                } size={40}></Icon.Ionicons>  Setting 4</Text>
            </TouchableHighlight>,

            <TouchableHighlight onPress={() => this.handleAddEvent()} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 4 }}>
                <Text style={{ fontSize: 20, color: '#2E3F47' }}><Icon.Ionicons name={
                    Platform.OS === 'ios'
                    ? 'ios-help-circle-outline'
                    : 'md-help-circle'
                } size={40}></Icon.Ionicons>  Setting 5</Text>
            </TouchableHighlight>,

        ];
    }
}

export default MainSettings;
