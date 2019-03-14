/**
 * -- ThundrSize.js --
 * Constants to control object size in Thundr app.
 * @format
 * @flow
 */

import { scale } from 'react-native-size-matters';

const ThundrSize = {
    xtiny: scale(10),
    tiny: scale(12),
    small: scale(16),
    smedium: scale(18),
    medium: scale(20),
    large: scale(24),
    xlarge: scale(28),
    xxlarge: scale(34),
    xxxlarge: scale(40),
    title: scale(50),
    buttonHeight: scale(40),
    largeButtonHeight: scale(50),
    headerHeight: scale(60),
};

export default ThundrSize;