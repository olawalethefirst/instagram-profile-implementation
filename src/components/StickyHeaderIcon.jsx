import PropTypes from "prop-types";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";
import { useCallback, useState, memo } from "react";
import { color757575, colorWhite } from "../constants";
import TaggedPostsIcon from "../svg/TaggedPostsIcon";
import UserPostsIcon from "../svg/UserPostsIcon";

const pathColors = [color757575, colorWhite];

function StickyHeaderIcon({ focussed, nestedListIndex, size }) {
  const [colorIndex, setColorIndex] = useState(focussed.value + 0);

  const updateColorIndex = useCallback(
    (newcolorIndex) => setColorIndex(newcolorIndex),
    []
  );

  useAnimatedReaction(
    () => {
      return focussed.value + 0;
    },
    (newcolorIndex) => {
      runOnJS(updateColorIndex)(newcolorIndex);
    },
    []
  );

  if (nestedListIndex === 0) {
    return <UserPostsIcon size={size} stroke={pathColors[colorIndex]} />;
  }
  return <TaggedPostsIcon size={size} stroke={pathColors[colorIndex]} />;
}

StickyHeaderIcon.propTypes = {
  focussed: PropTypes.objectOf(PropTypes.bool).isRequired,
  nestedListIndex: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

export default memo(StickyHeaderIcon);
