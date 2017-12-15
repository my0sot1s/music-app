import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet, Dimensions, Image, TouchableHighlight } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
const { width, height } = Dimensions.get("screen");


class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            love: false
        }
    }
    open() {
        this.props.navigation.navigate('Player',
            {
                artist: {
                    name: this.props.data.title,
                    background: this.props.data.albumImage
                },
                songs: [this.props.data],
                image: this.props.data.albumImage,
                songIndex: 0
            })
    }
    render() {
        return (
            <TouchableHighlight onPress={this.open.bind(this)}>
                <View
                    style={styles.main}
                    key={this.props.key}
                >

                    <Image
                        style={styles.avatar}
                        source={{ uri: this.props.data.albumImage }}
                    />
                    <View style={styles.center}>
                        <Text style={styles.title}>{this.props.data.title}</Text>
                        <Text style={styles.album}>{this.props.data.album}</Text>
                    </View>
                    <View style={styles.right}>
                        <Ionicons name={!this.state.love ? "ios-heart-outline" : "ios-heart"}
                            size={25} color={!this.state.love ? "#eee" : "red"}
                            style={{ textAlign: 'left' }} onPress={() => {
                                this.setState((prevState) => (
                                    { love: !prevState.love }
                                ))
                            }} />
                    </View>
                </View >
            </TouchableHighlight>
        );
    }
}

export default connect()(Song)
const styles = StyleSheet.create({
    main: {
        height: 0.1 * height,
        width: 100 + "%",
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111"
    },
    avatar: {
        flex: 1,
        height: 100 + "%"
    },
    center: {
        flex: 6,
        marginLeft: 10,
        flexDirection: 'column'
    },
    title: {
        color: "#fff",
        fontSize: 18
    },
    album: {
        color: "#fff",
        fontSize: 14
    },
    right: {
        flex: 1,
        justifyContent: 'flex-end'
    }
})