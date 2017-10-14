'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
  View,
  ListView
} from 'react-native';
import Button from 'react-native-button';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 280;
const STICKY_HEADER_HEIGHT = 50;
const AVATAR_SIZE = 120;

class ArtistShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: this.props.navigation.state.params.artist
    }
  }
  renderStickyHeader() {
    return (
      <View style={styles.stickySection}>
        <Text style={styles.stickySectionTitle}>{this.state.artist.name}</Text>
      </View>
    );
  }
  goBackList() {
    this.props.navigation.goBack();
  }
  playSong(){
    this.props.navigation.navigate('Player',
     { songIndex: 0,
       songs: this.state.artist.songs,
        image: this.state.artist.background, 
        artist: this.state.artist })
  }
  renderForeground() {
    return (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={styles.avatar} source={{
          uri: this.state.artist.background,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE
        }} />
        <Text style={styles.artistName}>
          {this.state.artist.name}
        </Text>
        <TouchableHighlight style={styles.playButton} onPress={this.playSong.bind(this)}>
          <Text

            style={styles.playButtonText}>
            PLAY
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderBackground() {
    return (
      <View key="background" style={styles.background}>
        <Image source={{
          uri: this.state.artist.background,
          width: window.width,
          height: PARALLAX_HEADER_HEIGHT
        }} />
        <View style={styles.backgroundOverlay} />
      </View>
    );
  }

  renderSongsList() {
    let songsDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.state.artist.songs);
    return (
      // onPress={() => Actions.player({ songIndex: parseInt(rowId), songs: this.props.artist.songs, artist: this.props.artist })}

      <ListView
        dataSource={songsDataSource}
        style={styles.songsList}
        renderRow={(song, sectionId, rowId) => (
          <TouchableHighlight activeOpacity={100} underlayColor="rgba(246, 41, 118, 0.6)">
            <View key={song} style={styles.song}>
              <Text style={styles.songTitle}>
                {song.title}
              </Text>
              <Text style={styles.albumTitle}>
                {song.album}
              </Text>
            </View>
          </TouchableHighlight>
        )} />
    );
  }

  render() {
    const { onScroll = () => { } } = this.props;
    return (
      <View>
        <ParallaxScrollView
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, width: window.width, height: window.height }}
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          onScroll={onScroll}
          renderStickyHeader={this.renderStickyHeader.bind(this)}
          renderForeground={this.renderForeground.bind(this)}
          renderBackground={this.renderBackground.bind(this)}>
          {this.renderSongsList()}
        </ParallaxScrollView>
        {/* onPress={Actions.pop} */}
        <View style={styles.headerClose}>
          <Icon name="ios-arrow-dropleft-circle-outline" size={30} color="#a0a0a0" style={{ backgroundColor: "transparent" }} onPress={this.goBackList.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#000",
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    width: window.width,
    backgroundColor: 'rgba(0,0,0,.8)',
    height: PARALLAX_HEADER_HEIGHT
  },
  headerClose: {
    position: 'absolute',
    top: 5,
    left: 0,
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickySectionTitle: {
    color: "#FFF",
  },
  parallaxHeader: {
    alignItems: 'center',
    paddingTop: 40,
    width: window.width,
  },
  artistName: {
    fontSize: 23,
    color: "#FFF",
    fontFamily: "Helvetica Neue",
  },
  avatar: {
    marginBottom: 12,
    borderRadius: AVATAR_SIZE / 2
  },
  playButton: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 70,
    paddingRight: 70,
    backgroundColor: "#f62976",
    borderRadius: 200,
  },
  playButtonText: {
    color: "#FFF",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
  },
  songsList: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 5,
    height: window.height - STICKY_HEADER_HEIGHT,
  },
  song: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#111",

  },
  songTitle: {
    color: "white",
    fontFamily: "Helvetica Neue",
    marginBottom: 5,
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: "Helvetica Neue",
    fontSize: 12
  },

});

export default connect()(ArtistShow);
