/*  -- FontStyles.js --
    Constants to control font size in Thundr app.
*/

import { Dimensions } from 'react-native'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const fontStyles = {
    tiny: SCREEN_HEIGHT / 100,
    small: SCREEN_HEIGHT / 60,
    body: SCREEN_HEIGHT / 40,
    header: SCREEN_HEIGHT / 30,
    title: SCREEN_HEIGHT / 20,
    huge: SCREEN_HEIGHT / 15,
    headerHeight: SCREEN_HEIGHT / 13,
}

export default fontStyles