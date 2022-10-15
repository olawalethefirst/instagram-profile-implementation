import { Image } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const profileURL = require("../../assets/images/profilePicture.webp");

function ProfileImage({ style }) {
  return <Image style={style} source={profileURL} />;
}

ProfileImage.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ]).isRequired,
};

export default ProfileImage;
