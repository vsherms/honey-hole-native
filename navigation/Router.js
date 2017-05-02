import { createRouter } from '@expo/ex-navigation';

import EntryScreen from '../screens/EntryScreen';
import SignUp from '../screens/SignUp';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HoneyHoleLibrary from '../screens/HoneyHoleLibrary';
import LibraryLinkScreen from '../screens/LibraryLinkScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  entry: () => EntryScreen,
  signup: () => SignUp,
  home: () => HomeScreen,
  links: () => LinksScreen,
  library: () => HoneyHoleLibrary,
  librarylink: () => LibraryLinkScreen,
  rootNavigation: () => RootNavigation,
}));
