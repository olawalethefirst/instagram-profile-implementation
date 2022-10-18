import PropTypes from "prop-types";
import HomeIcon from "../svg/HomeIcon";
import ReelsIcon from "../svg/ReelsIcon";
import SearchIcon from "../svg/SearchIcon";
import ActivityIcon from "../svg/ActivityIcon";
import ProfileIcon from "../svg/ProfileIcon";
import { Home, Search, Activity, Reels, Profile } from "../constants";

function TabBarIcon({ focused, name }) {
  switch (name) {
    case Home:
      return <HomeIcon size={25} focused={focused} />;
    case Search:
      return <SearchIcon size={25} focused={focused} />;
    case Activity:
      return <ActivityIcon size={25} focused={focused} />;
    case Reels:
      return <ReelsIcon size={25} focused={focused} />;
    case Profile:
      return <ProfileIcon size={25} focused={focused} />;
    default:
      return null;
  }
}

TabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default TabBarIcon;
