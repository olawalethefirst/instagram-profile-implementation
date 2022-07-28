import { StyleSheet } from 'react-native';
import {
    headerwithStatusBarHeight,
    headerHeight,
    colorWhite,
    colorBlack,
    deviceFont,
    color0294F7,
    color5a5a5a,
    color757575,
    postsHeaderHeight
} from '../constants';

const styles = StyleSheet.create({
    headerWithStatusBarHeight: {
        height: headerwithStatusBarHeight,
    },
    headerHeight: {
        height: headerHeight,
    },
    containerHorizontalPadding: {
        paddingHorizontal: 16.5,
    },
    headerBackground: {
        backgroundColor: colorBlack,
    },
    whiteText: {
        color: colorWhite,
    },
    fontSize25: {
        fontSize: 25,
    },
    defaultDeviceFont: {
        fontFamily: deviceFont,
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    marginTop4: {
        marginTop: 4,
    },
    justifyContentSpaceBetween: {
        justifyContent: 'space-between',
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    marginRight25: {
        marginRight: 25,
    },
    profilePicture: {
        height: 90,
        width: 90,
        borderRadius: 45,
    },
    justifyContentCenter: {
        justifyContent: 'center',
    },
    addProfilePicture: {
        height: 25,
        width: 25,
        backgroundColor: color0294F7,
        borderRadius: 25 / 2,
        bottom: 0,
        right: 0,
        borderWidth: 2,
    },
    profileDetailsDuoText1: {
        fontFamily: deviceFont,
        fontSize: 16,
        marginBottom: 2,
    },
    profileDetailsDuoText2: {
        fontSize: 14.5,
        fontFamily: deviceFont,
    },
    suggestFollowing: {
        width: 36,
        borderColor: color5a5a5a,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textAlignCenter: {
        textAlign: 'center',
    },
    flexGrow: {
        flexGrow: 1,
    },
    editProfileButton: {
        flexGrow: 1,
        borderColor: color5a5a5a,
        borderWidth: 1,
        marginRight: 8,
        borderRadius: 5,
        justifyContent: 'center',
    },
    editProfileButtonPressed: {
        backgroundColor: color5a5a5a,
        borderColor: color757575,
    },
    containerHorizontalMargin: {
        marginHorizontal: 16.5,
    },
    marginTop16point5: {
        marginTop: 16.5,
    },
    marginRight16point5: {
        marginRight: 16.5,
    },
    marginTop8: {
        marginTop: 8,
    },
    editProfileHeight: {
        height: 38,
    },
    storyImageContainer1: {
        height: 72,
        width: 72,
        borderRadius: 72 / 2,
        borderWidth: 1,
        borderColor: color5a5a5a,
    },
    storyImageContainer2: {
        borderRadius: 35,
        padding: 3,
    },
    storyItemImage: {
        height: 62,
        width: 62,
        borderRadius: 31,
    },
    width16point5: {
        width: 16.5,
    },
    marginLeft16point5: {
        marginLeft: 16.5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    fontWeight500: {
        fontWeight: '500',
    },
    storyItemContainer: {
        width: 72,
    },
    fontSize13: {
        fontSize: 13,
    },
    positionAbsolute: {
        position: 'absolute',
    },
    backgroundColorBlack: {
        backgroundColor: colorBlack,
    },
    postsHeader: {
        height: postsHeaderHeight,
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        paddingBottom: 2,
    },
    flex1: {
        flex: 1,
    },
    backgroundColorWhite: {
        backgroundColor: colorWhite,
    },
    postsScrollIndicator: {
        height: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    
});

export default styles;
