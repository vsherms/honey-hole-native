import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { inject, observer } from 'mobx-react';
import HoneyHole from './HoneyHole';

class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Honey Hole',
      backgroundColor: '#e6e9ed',
    },
  };

  render() {
    return (
        <HoneyHole location={this.props.locationStore.currentLocation} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});

LinksScreen.propTypes = {
  locationStore: React.PropTypes.object
};

export default inject('locationStore')(observer(LinksScreen));
