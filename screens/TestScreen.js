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
import Modal from 'react-native-modal'

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