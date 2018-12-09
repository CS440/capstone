import { createStackNavigator } from 'react-navigation';
import MainSettings from '../screens/SettingsScreens/MainSettings';
import AboutACHS from '../screens/SettingsScreens/AboutACHS';

// creating stack navigator with list of screen to navigate to.
// in this case AboutACHS page can be accessed
const SettingsNavStack = createStackNavigator(
  {
    MainScreen: { screen: MainSettings },
    AboutScreen: { screen: AboutACHS }
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: "none"
  }
);

export default SettingsNavStack;