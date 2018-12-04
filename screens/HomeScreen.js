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
    TouchableOpacity,
    Image,
} from 'react-native'
import FontStyles from '../components/FontStyles'
import { scale } from 'react-native-size-matters'
import ActionButton from 'react-native-action-button'
import HomeScreenItem from '../components/HomeScreenItem'
import brainstormData from '../data/BrainstormData'

export default class HomeScreen extends React.Component {
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

    /* renderItem function for Flatlist. */
    _renderItem = ({item}) => (
        <HomeScreenItem
            title={item.title}
            date={item.date}
            description={item.description}
            ideas={item.ideas}
            collaborators={item.collaborators}
        />
    )

    /* renderSeparator function for Flatlist. */
    _renderSeparator = () => (
        <View 
            style = {{
                height: scale(0.5),
                backgroundColor: '#cccccc',
            }}
        />
    )

    /* Header styling. */
    static navigationOptions = {
        title: 'Brainstorms', 
        headerStyle: {
            borderBottomWidth: 0,
            height: FontStyles.headerHeight,
            backgroundColor: '#FAD15F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W3',
            fontSize: FontStyles.medium,
        },
        headerBackTitle: null,
        headerRight: (
            <TouchableOpacity 
                style={ {paddingRight: scale(25), paddingBottom: scale(8)} } 
                onPress={ () => {} }
            >
                <Image
                    source={require('../images/search.png')}
                    resizeMode='contain'
                    style={ {width: scale(17), height: scale(17)} }
                />
            </TouchableOpacity>
        ),
    }
}