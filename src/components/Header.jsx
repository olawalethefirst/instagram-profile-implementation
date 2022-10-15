import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import EntypoIcon from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";
import styles from "./styles";
import { ProfileFeed, ViewPost, colorWhite } from "../constants";
import HamburgerIcon from "../SVG/HamburgerIcon";
import PlusIcon from "../SVG/PlusIcon";
import TextButton from "./TextButton";
import ViewPostHeaderBackIcon from "../SVG/ViewPostHeaderBackIcon";

function Header({ route: { name, params }, navigation: { goBack } }) {
  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.headerWithStatusBarHeight, styles.backgroundColorBlack]}
    >
      <StatusBar
        // eslint-disable-next-line react/style-prop-object
        style="light"
        backgroundColor={styles.backgroundColorBlack.backgroundColor}
      />
      {name === ProfileFeed && (
        <View
          style={[
            styles.justifyContentSpaceBetween,
            styles.flex1,
            styles.flexDirectionRow,
            styles.containerHorizontalPadding,
          ]}
        >
          <TextButton
            style={[styles.flexDirectionRow, styles.alignItemsCenter]}
          >
            <Text
              style={[
                styles.whiteText,
                styles.defaultDeviceFont,
                styles.fontSize24,
              ]}
            >
              olawalethefirst
            </Text>
            <EntypoIcon
              name="chevron-small-down"
              size={18}
              color={colorWhite}
            />
          </TextButton>
          <View style={[styles.flexDirectionRow, styles.alignItemsCenter]}>
            <TextButton style={styles.marginRight25}>
              <PlusIcon height={25} width={25} />
            </TextButton>
            <TextButton>
              <HamburgerIcon height={25} width={25} />
            </TextButton>
          </View>
        </View>
      )}
      {name === ViewPost && (
        <View
          style={[
            styles.flex1,
            styles.justifyContentCenter,
            styles.viewPostHeaderContainer,
          ]}
        >
          <TextButton onPress={goBack} style={styles.viewPostHeaderBackButton}>
            <ViewPostHeaderBackIcon size={17} />
          </TextButton>
          <Text
            style={[
              styles.defaultDeviceFont,
              styles.textAlignCenter,
              styles.viewPostHeaderTitle,
            ]}
          >
            OLAWALETHEFIRST
          </Text>
          <Text
            style={[
              styles.whiteText,
              styles.defaultDeviceFont,
              styles.textAlignCenter,
              styles.viewPostHeaderSubTitle,
            ]}
          >
            {params.post.type}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

Header.propTypes = {
  route: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any]))
    .isRequired,
};

export default Header;
