import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Profile } from "../constants";
import DownArrowIcon from "../SVG/DownArrowIcon";
import HamburgerIcon from "../SVG/HamburgerIcon";
import PlusIcon from "../SVG/PlusIcon";
import TextButton from "./TextButton";

function Header({ route: { name } }) {
  const title = name === Profile ? "olawalethefirst" : name;

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.headerWithStatusBarHeight,
        styles.containerHorizontalPadding,
        styles.backgroundColorBlack,
        styles.flexDirectionRow,
        styles.justifyContentSpaceBetween,
      ]}
    >
      <StatusBar
        style="light"
        backgroundColor={styles.backgroundColorBlack.backgroundColor}
      />
      <TextButton style={[styles.flexDirectionRow, styles.alignItemsCenter]}>
        <Text
          style={[
            styles.whiteText,
            styles.defaultDeviceFont,
            styles.fontSize25,
          ]}
        >
          {title}{" "}
        </Text>
        <View style={styles.marginTop4}>
          <DownArrowIcon size={15} />
        </View>
      </TextButton>
      <View style={[styles.flexDirectionRow, styles.alignItemsCenter]}>
        <TextButton style={styles.marginRight25}>
          <PlusIcon height={25} width={25} />
        </TextButton>
        <TextButton>
          <HamburgerIcon height={25} width={25} />
        </TextButton>
      </View>
    </SafeAreaView>
  );
}

Header.propTypes = {
  name: PropTypes.string,
  route: PropTypes.object,
};

export default Header;
