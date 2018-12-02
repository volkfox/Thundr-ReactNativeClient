/*  -- HomePage.js --
    Home page of Thundr. Allows user to browse previous brainstorms
    and has a FAB that allows creation of new brainstorms.
*/

import React from 'react'
import { 
    View, 
    StatusBar, 
    SafeAreaView,
    FlatList,
} from 'react-native'
import FontStyles from '../components/FontStyles'
import ActionButton from 'react-native-action-button'
import brainstormData from '../components/BrainstormData'
import HomeScreenItem from '../components/HomeScreenItem';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Brainstorms', 
        headerStyle: {
            borderBottomWidth: 0,
            height: FontStyles.headerHeight,
            backgroundColor: '#FAD15F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.header,
        },
        headerBackTitle: null,
    }

    _renderItem = ({item}) => (
        <HomeScreenItem
            title={item.title}
            date={item.date}
            summary={item.summary}
            ideas={item.ideas}
            collaborators={item.collaborators}
        />
    )

    _renderSeparator = () => (
        <View 
            style = {{
                height: 0.5,
                width: '100%',
                backgroundColor: '#cccccc',
            }}
        />
    )
   
    render() {
        return (
            <SafeAreaView style={{flex: 1}}> 
                <StatusBar barStyle='light-content'/>
                <FlatList
                    data={brainstormData}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                />
                <ActionButton
                    buttonColor='#FAD15F' 
                    onPress={ () => {this.props.navigation.push('NewBrainstorm')}}
                />
            </SafeAreaView>
        )
    }
}