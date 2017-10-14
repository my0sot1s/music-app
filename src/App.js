import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './store/store'

import AppContainer from './navigation'
// import ArtistList from "./components/artists/ArtistList"


export default class extends Component {
    render() {
        return <Provider store={configureStore()}>
            <AppContainer />
        </Provider>
    }
}
