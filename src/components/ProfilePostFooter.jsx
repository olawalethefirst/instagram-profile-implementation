import { View } from "react-native";
import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import ViewProfilePostFooterButton from "./ViewProfilePostFooterButton";
import LikePostIcon from "../svg/LikePostIcon";
import PostCommentIcon from "../svg/PostCommentIcon";
import SharePostIcon from "../svg/SharePostIcon";
import SavePostIcon from "../svg/SavePostIcon";

function ProfilePostFooter({
  containerHorizontalPadding,
  containerVerticalPadding,
  liked,
  saved,
  updateLiked,
  updateSaved,
}) {
  return (
    <View
      style={[
        styles.flexDirectionRow,
        styles.alignItemsCenter,
        styles.justifyContentSpaceBetween,
        {
          paddingVertical: containerVerticalPadding,
          paddingHorizontal: containerHorizontalPadding,
        },
      ]}
    >
      <View style={[styles.flexDirectionRow, styles.alignItemsCenter]}>
        <ViewProfilePostFooterButton
          containerStyle={styles.marginRight20}
          onPress={updateLiked}
        >
          <LikePostIcon size={25} liked={liked} />
        </ViewProfilePostFooterButton>
        <ViewProfilePostFooterButton containerStyle={styles.marginRight20}>
          <PostCommentIcon size={25} />
        </ViewProfilePostFooterButton>
        <ViewProfilePostFooterButton>
          <SharePostIcon size={25} />
        </ViewProfilePostFooterButton>
      </View>
      <ViewProfilePostFooterButton onPress={updateSaved}>
        <SavePostIcon size={25} saved={saved} />
      </ViewProfilePostFooterButton>
    </View>
  );
}

ProfilePostFooter.propTypes = {
  containerHorizontalPadding: PropTypes.number.isRequired,
  containerVerticalPadding: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  updateLiked: PropTypes.func.isRequired,
  updateSaved: PropTypes.func.isRequired,
};

export default memo(ProfilePostFooter);
