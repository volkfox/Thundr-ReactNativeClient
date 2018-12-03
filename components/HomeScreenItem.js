/*  -- HomeScreenItem.js --
    FlatList element for the home screen. 
    Renders the title, date, description, ideas generated, and collaborators 
    for a past brainstorm.
 */

import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
} from 'react-native'
import FontStyles from './FontStyles'

export default class HomeScreenItem extends React.Component {
    render() {
        /* Build string of collaborators. */
        let collaborators = () => {
            const length = this.props.collaborators.length
            if (length > 2) {
                return 'with ' + this.props.collaborators[0] + ' and ' + (length - 1) + ' others'
            } else if (length == 1) {
                return 'with ' + this.props.collaborators[0]
            } else if (length == 2) {
                return 'with ' + this.props.collaborators[0] + ' and ' + this.props.collaborators[1]
            } else {
                return 'with no others'
            }
        }        

        return (
            <View style={styles.itemContainer}>
                <View style= {styles.titleLine}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText} numberOfLines={1}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{this.props.date}</Text>
                    </View>
                    <View style={styles.menuContainer}>
                        <Text style={{color: '#7E7E7E'}}>...</Text>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText} numberOfLines={3}>
                        {this.props.description}
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Image
                        style={styles.bolt}
                        source={require('../images/gray_bolt.png')}
                        resizeMode='contain'
                    />
                    <View style={styles.ideasContainer}>
                        <Text style={styles.infoText} numberOfLines={1}>{this.props.ideas}</Text>
                    </View>
                    <Image 
                        style={styles.collaborator}
                        source={require('../images/collaborator.png')}
                        resizeMode='contain'
                    />
                    <View style={styles.collaboratorsContainer}>
                        <Text 
                            style={styles.infoText} 
                            numberOfLines={1}
                            ellipsizeMode='middle'
                        >
                            {collaborators()}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        marginLeft: Dimensions.get('window').width / 10,
        marginRight: Dimensions.get('window').width / 20,
        paddingVertical: 20,
    },
    titleLine: {
        flex: 1,
        flexDirection: 'row',
    },
    titleContainer: {
        width: '65%',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small,
    },
    dateContainer: {
        width: '20%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    dateText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.tiny,
        color: '#7E7E7E',
    },
    menuContainer: {
        width: '15%',
        alignItems: 'flex-end',
    },
    descriptionContainer: {
        flex: 1,
        width: '75%',
        marginVertical: 10,
    },
    descriptionText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small - 3,
        color: '#7E7E7E',
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    bolt: {
        width: 20,
        height: 20,
    },
    ideasContainer: {
        justifyContent: 'flex-end',
        width: '15%',
    },
    infoText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small - 3,
        color: '#7E7E7E', 
    },
    collaboratorsContainer: {
        justifyContent: 'flex-end',
        width: '50%',
        paddingLeft: 7,
    },
    collaborator: {
        width: 15,
        height: 15,
    },
})
