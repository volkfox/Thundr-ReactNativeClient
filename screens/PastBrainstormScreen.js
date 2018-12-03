/*  -- PastBrainstormScreen.js --

*/

import React from 'react'
import {
    SafeAreaView,
    Text,
    View,
    FlatList,
    StatusBar,
    TouchableOpacity,
    Image,
} from 'react-native'
import FontStyles from '../components/FontStyles'
import ActionButton from 'react-native-action-button'
import pastData from '../data/PastData'
import PastBrainstormItem from '../components/PastBrainstormItem'

export default class PastBrainstormScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle='light-content'/>
            <FlatList
                data={pastData}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._renderSeparator}
            />
            <ActionButton
                    buttonColor='#FAD15F' 
                    onPress={ () => {}}
            />
            </SafeAreaView>
        )
    }

    /* renderItem function for Flatlist. */
    _renderItem = ({item}) => (
        <PastBrainstormItem
            idea={item.idea}
            notes={item.notes}
            upvotes={item.upvotes}
        />
    )

    /* renderSeparator function for Flatlist. */
    _renderSeparator = () => (
        <View 
            style = {{
                height: 0.5,
                width: '100%',
                backgroundColor: '#cccccc',
            }}
        />
    )

    /* Header styling. */
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title', null), 
        headerStyle: {
            borderBottomWidth: 0,
            height: FontStyles.headerHeight,
            backgroundColor: '#FAD15F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.body - 3,
        },
        headerLeft: null,
        headerRight: (
            <TouchableOpacity style={ {paddingRight: 25, paddingBottom: 8} }
                onPress={ () => {} }
            >
                <Image
                    source={require('../images/info_button.png')}
                    resizeMode='contain'
                    style={ {width: 22, height: 22}}
                />
            </TouchableOpacity>
        ),
    }) 
}