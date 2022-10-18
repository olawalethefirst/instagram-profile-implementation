import { View, Image } from "react-native";
import { memo } from "react";
import PropTypes from "prop-types";
import ProfilePostHeader from "./ProfilePostHeader";
import ProfilePostFooter from "./ProfilePostFooter";
import { width, color2b2b2b } from "../constants";

function ProfilePost({ uri, liked, saved, updateLiked, updateSaved }) {
  return (
    <View>
      <ProfilePostHeader
        containerHorizontalPadding={15}
        containerVerticalPadding={15}
      />
      <Image
        style={{ width, height: width, backgroundColor: color2b2b2b }}
        source={{ uri }}
      />
      <ProfilePostFooter
        containerHorizontalPadding={15}
        containerVerticalPadding={15}
        liked={liked}
        saved={saved}
        updateLiked={updateLiked}
        updateSaved={updateSaved}
      />
    </View>
  );
}

ProfilePost.propTypes = {
  uri: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  updateLiked: PropTypes.func.isRequired,
  updateSaved: PropTypes.func.isRequired,
};

export default memo(ProfilePost);
