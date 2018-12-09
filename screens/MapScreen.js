import * as React from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableHighlight, Image, Platform, ImageBackground} from 'react-native';
import Expo from 'expo';
import { Marker, AnimatedRegion } from "react-native-maps";
import haversine from "haversine";
import { RaisedTextButton } from 'react-native-material-buttons';

// constant for image resize mode
const resizeMode = 'center';

// starting latitude and longitude
const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

// import for the location data
const data = require("../assets/data_points/fake.json");

// arrays used to hold the markers for each of the location filter types
var lincolnsVisit = [];
var citandBattle = []; 
var burgBlackHistory = []; 
var earlyBurg = []; 
var allStops = [];

export default class App extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion ({
        latitude: LATITUDE,
        longitude: LONGITUDE
      }),
      pickerSelection: '',
      pickerDisplayed: false,
      modalVisible: true,
      locationVisible: false,
      curMarker: 0
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setLocationModalVisible(visible) {
    this.setState({locationVisible: visible})
  }

  setPickerValue(newValue) {
    this.setState({
      pickerSelection: newValue
    })

    this.togglePicker();
  }

  togglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  }

  state = {
    location: null,
  }

  // Asks the user for permission to use location services
  _getLocationAsync = async () => {
    let {status} = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      console.error("Location permission not granted!");
      return;
    }


  let location = await Expo.Location.getCurrentPositionAsync({});
  this.setState({location: location});
};

// ensures that the component mounts
componentDidMount() {
  this._getLocationAsync(); // call method as soon as component mounts
  const { coordinate } = this.state;
  this.watchID = navigator.geolocation.watchPosition(
    position => {
      const { coordinate, routeCoordinates, distanceTravelled } = this.state;
      const { latitude, longitude } = position.coords;

      const newCoordinate = {
        latitude,
        longitude
      };

      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(
            newCoordinate,
            500 
          );
        }
      } else {
        coordinate.timing(newCoordinate).start();
      }

      this.setState({
        latitude,
        longitude,
        routeCoordinates: routeCoordinates.concat([newCoordinate]),
        distanceTravelled:
          distanceTravelled + this.calcDistance(newCoordinate),
        prevLatLng: newCoordinate
      });
    },
    error => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
}

componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchID);
}

calcDistance = newLatLng => {
  const { prevLatLng } = this.state;
  return haversine(prevLatLng, newLatLng) || 0;
};

getMapRegion = () => ({
  latitude: this.state.latitude,
  longitude: this.state.longitude,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
});

  render() {

    // render the locations on the map
    this.renderStopArrays();
	
    const pickerValues = [
      {
        title: 'All Stops',
        value: 'All Stops'
      },
      {
        title: "Lincoln's Visit",
        value: "Lincoln's Visit"
      },
      {
        title: 'Citizens and the Battle',
        value: 'Citizens and the Battle'
      },
      {
        title: "Gettysburg's Black History",
        value: "Gettysburg's Black History"
      },
      {
        title: "Early Gettysburg",
        value: "Early Gettysburg"
      }
    ]

    if (!this.state.location) {
      return (<View/>)
    }
    return (
      <React.Fragment>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
            style ={{alignItems: 'center', justifyContent: 'center'}}
          >
            <ImageBackground
              style={{
                backgroundColor: '#ccc',
                flex: 1,
                resizeMode,
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}
              source={require('../assets/images/map.jpg')}
            >
              <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                  
              <View style ={{borderWidth: 3, borderColor: '#85251a', opacity: 0.8,  margin: 45, backgroundColor: 'rgba(166, 46, 32, 0.6)', justifyContent: 'center', backgroundColor: '#A62E20'}}><Text style={styles.getStartedText}>{'Gettysburg: A Walk   \n Through Time'}</Text></View>
                <RaisedTextButton title='Get Started!' color='#2E3F47' titleColor='#fff' onPress={() => {this.setModalVisible(!this.state.modalVisible);}}></RaisedTextButton>
              </View>
            </ImageBackground>
          </Modal>
        </View>
        {/* Map filtering modal */}
        <View style={{height: 0}} />
          <Button  onPress={() => this.togglePicker()} title={ "Map Filters" }/>
          <Text style={{fontSize: 20, textAlignVertical: "center",textAlign: "center"}}> { this.state.pickerSelection }</Text>
          <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
            <View style={{ flex: 1, margin: 20, padding: 20,
              backgroundColor: '#2E3F47',
              bottom: 20,
              left: 20,
              right: 20,
              alignItems: 'center',
              position: 'absolute' }}
            >
              { pickerValues.map((value, index) => {
                return <TouchableHighlight key={index} onPress={() => this.setPickerValue(value.value)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                          <Text style={{color: '#fff', fontSize: 20}}>{ value.title }</Text>
                        </TouchableHighlight>
              })}
              <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                <Text style={{ color: '#999' }}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>

        {/* Location Modal */}
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.locationVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            }}>
            <View style ={{flex: 1, alignItems: 'stretch'}}>
              <TouchableHighlight onPress={() => this.setLocationModalVisible(!this.state.locationVisible)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                <Text style={{ color: '#999', fontSize: 30, paddingLeft: 5, paddingTop: 15, fontWeight: 'bold'}}>x</Text>
              </TouchableHighlight>
              {/* Save the getImages() funtionality for the final app. This is hardcoded currently, and should be rendered dynamically. */}
              {/* {this.getImages(this.state.curMarker)} */}
              <Text style={styles.siteText}>{data[this.state.curMarker].siteName}</Text>
              <Text style={styles.descText}>{data[this.state.curMarker].desc}</Text>
            </View>
          </Modal>
        </View>
        {/* Renders the map view */}
        <Expo.MapView style = {{flex: 1}} provider = {Expo.MapView.PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
          {this._filter()}
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate} 
          >
            <View style = {styles.marker}></View> 
          </Marker.Animated>
        </Expo.MapView>
    </React.Fragment>
    );
  }
  
  // method that builds the markers based on the json data
  renderStopArrays(){
	  for(let i = 0; i < data.length; i++) {
      if(data[i].category == "Lincoln's Visit") {
        lincolnsVisit.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName}  pinColor = {"#4285F4"}/>)
        allStops.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName}  pinColor = {"#4285F4"}/>)
      }
      else if(data[i].category == "Citizens and the Battle") {
        citandBattle.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName}  pinColor = {"#DB4437"}/>)
        allStops.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName}  pinColor = {"#DB4437"}/>)
      }
      else if(data[i].category == "Gettysburg's Black History") {
        burgBlackHistory.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName}  pinColor = {"#E87722"}/>)
        allStops.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName}  pinColor = {"#E87722"}/>)
      }
      else if(data[i].category == "Early Gettysburg") {
        earlyBurg.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName}  pinColor = {"#0F9D58"}/>)
        allStops.push(<Expo.MapView.Marker onPress={() => this.markerClick(i)} coordinate = {{latitude: data[i].lat, longitude: data[i].longit}} title = {data[i].siteName} pinColor = {"#0F9D58"}/>)
      }
	 } 
  }

  /*
  Filtering tour types
  Return specific tour type
  */
  _filter() {
    if (this.state.pickerSelection == "Lincoln's Visit") {
        return (
        <React.Fragment>
          {lincolnsVisit}
        </React.Fragment>
        );
      }
      
      else if (this.state.pickerSelection == "Citizens and the Battle"){
        return (
        <React.Fragment>
          {citandBattle}
        </React.Fragment>
        );
      }

      else if (this.state.pickerSelection == "Gettysburg's Black History") {
        return (
        <React.Fragment>
          {burgBlackHistory}
        </React.Fragment>
        );
      }

      else if (this.state.pickerSelection == "Early Gettysburg") {
        return (
        <React.Fragment>
          {earlyBurg}     
        </React.Fragment>
        );
      }
      else {
        return (
          <React.Fragment> 
            {allStops}
          </React.Fragment>
        );   
    }
  }

//   getImages(index) {
//     im1 = '../assets/images/';
//     im1 = im1.concat(data[index].images.image1.fn.toString())
//    return (
//       <Image source={require('../assets/images/David_Wills.jpg')} style={{paddingTop: 5, width:200, height:200}} />
//    );
//  }


  markerClick(index) {
    this.state.curMarker = index;
    // this.setLocationModalVisible(); uncomment once the modals are dynamically rendered for each stop.
  }
}

const styles = StyleSheet.create({
  getStartedText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#fff',
    height: 100,
    width: '90%',
    padding: 10,
    textAlign: 'center'
},
  siteText: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#7f7f7f',
    color: '#fff',
    alignItems: 'center',
    padding: 5
  },
  descText: {
    fontSize: 20,
    color: '#7f7f7f',
    alignItems: 'center',
    padding: 10
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: '#bd0247',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#e3256b'
  }
});
