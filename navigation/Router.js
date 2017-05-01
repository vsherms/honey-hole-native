import { createRouter } from '@expo/ex-navigation';

import EntryScreen from '../screens/EntryScreen';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HoneyHoleLibrary from '../screens/HoneyHoleLibrary';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  entry: () => EntryScreen,
  home: () => HomeScreen,
  links: () => LinksScreen,
  library: () => HoneyHoleLibrary,
  rootNavigation: () => RootNavigation,
}));
