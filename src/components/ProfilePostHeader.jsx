import { View, Text, TouchableOpacity } from "react-native";
import { memo } from "react";
import PropTypes from "prop-types";
import { username, activeOpacity } from "../constants";
import styles from "./styles";
import ProfileImage from "./ProfileImage";
import PostActionIcon from "../svg/PostActionIcon";

function ProfilePostHeader({
  containerHorizontalPadding,
  containerVerticalPadding,
}) {
  return (
    <View
      style={[
        styles.alignItemsCenter,
        styles.flexDirectionRow,
        styles.justifyContentSpaceBetween,
        {
          paddingVertical: containerVerticalPadding,
          paddingHorizontal: containerHorizontalPadding,
        },
      ]}
    >
      <View style={[styles.flexDirectionRow, styles.alignItemsCenter]}>
        <ProfileImage style={styles.profilePostHeaderProfileImage} />
        <Text
          style={[styles.devicefontStyle, styles.whiteText, styles.fontSize16]}
        >
          {username}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={activeOpacity}
        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
      >
        <PostActionIcon size={15} />
      </TouchableOpacity>
    </View>
  );
}

ProfilePostHeader.propTypes = {
  containerHorizontalPadding: PropTypes.number.isRequired,
  containerVerticalPadding: PropTypes.number.isRequired,
};

export default memo(ProfilePostHeader);
