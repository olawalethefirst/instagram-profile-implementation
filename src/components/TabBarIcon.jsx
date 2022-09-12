import HomeIcon from '../SVG/HomeIcon';
import ReelsIcon from '../SVG/ReelsIcon';
import SearchIcon from '../SVG/SearchIcon';
import ActivityIcon from '../SVG/ActivityIcon';
import ProfileIcon from '../SVG/ProfileIcon';
import { Home, Search, Activity, Reels, Profile } from '../constants';
import PropTypes from 'prop-types';

const TabBarIcon = ({ focused, name }) => {
    switch (name) {
        case Home:
            return <HomeIcon width={25} height={25} focused={focused} />;
        case Search:
            return <SearchIcon width={25} height={25} focused={focused} />;
        case Activity:
            return <ActivityIcon width={25} height={25} focused={focused} />;
        case Reels:
            return <ReelsIcon width={25} height={25} focused={focused} />;
        case Profile:
            return <ProfileIcon width={25} height={25} focused={focused} />;
        default:
            return null;
    }
};

TabBarIcon.propTypes = {
    25: PropTypes.number,
    focused: PropTypes.bool,
    name: PropTypes.string,
};

export default TabBarIcon;
