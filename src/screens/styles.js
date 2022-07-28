import { StyleSheet } from 'react-native';
import { colorBlack, colorWhite } from '../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBlack,
    },
    justifyContentCenter: {
        justifyContent: 'center',
    },
    alignTextCenter: {
        textAlign: 'center',
    },
    whiteFont: {
        color: colorWhite,
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    containerMargin: {
        marginHorizontal: 16.5,
    },
    justifyContentSpaceBetween: {
        justifyContent: 'space-between',
    },
    profileScreenSpacer: {
        height: 20
    }
});

export default styles;
