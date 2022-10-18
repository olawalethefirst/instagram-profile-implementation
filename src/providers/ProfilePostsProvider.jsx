import { createContext } from "react";
import PropTypes from "prop-types";
import useProfilePosts from "../hooks/useProfilePosts";

export const ProfilePostsContext = createContext();

function ProfilePostsProvider({ children }) {
  const postsState = useProfilePosts(2);

  return (
    <ProfilePostsContext.Provider value={postsState}>
      {children}
    </ProfilePostsContext.Provider>
  );
}

ProfilePostsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default ProfilePostsProvider;
