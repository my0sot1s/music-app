'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';
import Button from 'react-native-button';
import { Artists } from '../../mock';
import ArtistListItem from './ArtistListItem';
import { connect } from 'react-redux'

class ArtistList extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(Artists),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>
          Artists
        </Text> */}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(artist) => <ArtistListItem artist={artist} {...this.props} />} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#111',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  instructions: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
});
export default connect()(ArtistList);