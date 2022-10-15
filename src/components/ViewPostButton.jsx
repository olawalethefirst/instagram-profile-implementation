import PropTypes from "prop-types";
import TextButton from "./TextButton";

function ViewPostButton({ Icon }) {
  return (
    <TextButton
      style={{
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
      }}
    >
      <Icon size={12} />
    </TextButton>
  );
}

ViewPostButton.propTypes = {
  Icon: PropTypes.func.isRequired,
};

export default ViewPostButton;
