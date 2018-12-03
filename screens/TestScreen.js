/*
    Used for testing components.
*/

import React from 'react'
import {
    FlatList,
    SafeAreaView,
    View,
    Text,
} from 'react-native'
import brainstormData from '../data/BrainstormData'

class FlatListItem extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Text>{this.props.title}</Text>
                <Text>{this.props.summary}</Text>
            </View>
        )
    }
}

export default class TestScreen extends React.Component {
    
    _renderItem = ({item}) => (
        <FlatListItem
            title={item.title}
            summary={item.summary}
        />
    )
    
    render() {
        return(
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    data={brainstormData}
                    renderItem={this._renderItem}
                />
            </SafeAreaView>
        )
    }
}