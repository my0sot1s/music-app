import React, { Component } from 'react';
import { ListView, View, Text } from "react-native"

import { Artists } from '../../mock';
import SongItem from './songItem'


class ListSongs extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            // dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            dataSource: null
        };
    }
    componentDidMount() {
        let _yemp = [];
        fetch(`http://localhost:3000/music`).then(doc => {
            return doc.json()
        }).then(doc => {
            doc.map(value => {
                _yemp.push(...value.songs)
            })
            this.setState({ dataSource: this.ds.cloneWithRows(_yemp) })
        })

    }
    renderRow(rowData, sectionId, rowId) {
        return <SongItem data={rowData} {...this.props} />
    }
    render() {
        if (!this.state.dataSource) return <View></View>
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
}

export default ListSongs;