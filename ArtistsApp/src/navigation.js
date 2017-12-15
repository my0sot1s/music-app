import React from 'react'
import { View, StatusBar } from 'react-native'
import { TabNavigator, addNavigationHelpers, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ArtistList from "./components/artists/ArtistList"
import SongList from "./components/songs/songs"
import ArtistShow from "./components/artists/ArtistShow"
import Player from "./components/player/Player"

const MainTab = TabNavigator({
  ArtistList: {
    screen: ArtistList,
    navigationOptions: ({ navigation }) => ({
      title: "Artists",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-list" size={29} />
      ),
    })
  },
  SongList: {
    screen: SongList,
    navigationOptions: ({ navigation }) => ({
      title: "Songs",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-musical-notes" size={29} />
      ),
    })
  }
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: "#eee",
      labelStyle: {
        fontSize: 10,
        alignSelf: "center",
      },
      style: {
        backgroundColor: '#333333',
        // marginTop: 20,
        justifyContent: "center",
        alignItems: 'center'
      },
    },

  })
const AppNavigator = StackNavigator({
  ArtistList: {
    screen: MainTab,
    navigationOptions: ({ navigation }) => ({
      title: "ArtistList",
    })
  },
  ArtistShow: {
    screen: ArtistShow,
    navigationOptions: ({ navigation }) => ({
      title: "ArtistShow",
    })
  },
  Player: {
    screen: Player,
    navigationOptions: ({ navigation }) => ({
      title: "Player",
    })
  }
}, {
    headerMode: 'none',
  })



export const navReducer = (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const navigationHelper = props => addNavigationHelpers({
  dispatch: props.dispatch,
  state: props.nav,
})

/**
 * Config navigation
 * @param {Object} props 
 */

const AppNavigations = props => (
  <View style={{ width: 100 + "%", height: 100 + "%" }}>
    <StatusBar hidden />
    <AppNavigator navigation={navigationHelper(props)} />
  </View>

)

export default connect(state => ({
  nav: state.nav
}))(AppNavigations)