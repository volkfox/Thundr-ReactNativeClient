/*  -- CollaboratorItem.js --
    Used by NewBrainstormScreen to display the user's collaborators
    (who they've invited).
 */

 import React from 'react'
 import {
     View,
     Text,
     Image,
     StyleSheet,
 } from 'react-native'
import FontStyles from './FontStyles';

 export default class CollaboratorItem extends React.Component {
     render() {
        const randomHeadshots = [
            require('../images/headshot_0.jpg'),
            require('../images/headshot_1.jpg'),
            require('../images/headshot_2.jpg')
        ]

        return (
            <View style={styles.container}>
                <Image
                    source={randomHeadshots[Math.floor(Math.random() * randomHeadshots.length)]}
                    style={styles.bolt}
                    resizeMode='contain'
                />
                <Text style={styles.text}>{this.props.name}</Text>
            </View>
        )
     }
 }

 /* Style sheet. */
 const styles = StyleSheet.create ({
     container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 40,
        alignItems: 'flex-end',
     },
     bolt: {
        width: 50,
        height: 50,
     },
     text: {
        marginLeft: 5,
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.body,
         
     }
 })