import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Expo from 'expo';



export default class App extends React.Component {

  state = {
    location: null,
  }

  _getLocationAsync = async () => {
    let {status} = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      console.error("Location permission not granted!");
      return;
    }


  let location = await Expo.Location.getCurrentPositionAsync({});
  this.setState({location: location});
};

componentDidMount() {
  this._getLocationAsync(); // call method as soon as component mounts
}

  render() {

    if (!this.state.location) {
      return (<View />)
    }
    return (
      <Expo.MapView style = {{flex: 1}} provider = {Expo.MapView.PROVIDER_GOOGLE}
      //<Expo.MapView style = {{flex: 1}}
      initialRegion = {{
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        //latitude: 39.821205,
        //longitude: -77.232254,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0421,

      }}>

      // These are the markers for the map
      <Expo.MapView.Marker coordinate = {this.state.location.coords} title = {"You are here cool person"} pinColor = {"#f442f1"} />
      <Expo.MapView.Marker coordinate = {{latitude: 39.821205, longitude: -77.232254}} title = {"Scary Place"} />
      <Expo.MapView.Marker coordinate = {{latitude: 39.830947, longitude: -77.231133}} title = {"Lincoln Square"} description = {"The Circle of Gettysburg"} pinColor = {"#ede02d"}/>
      <Expo.MapView.Marker coordinate = {{latitude: 39.832010, longitude: -77.231280}} title = {"Lincoln Diner"} description = {"Questionable food"} pinColor = {"#1fddf2"}/>


      </Expo.MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Expo.Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
