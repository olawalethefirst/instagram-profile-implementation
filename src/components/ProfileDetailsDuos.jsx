import { Text } from "react-native";
import PropTypes from "prop-types";
import TextButton from "./TextButton";
import styles from "./styles";

function ProfileDetailsDuos({ text1, text2, style, textAlign }) {
  return (
    <TextButton style={style}>
      <Text
        style={[
          styles.profileDetailsDuoText1,
          styles.whiteText,
          styles.boldText,
          { textAlign },
        ]}
      >
        {text1}
      </Text>
      <Text
        style={[
          styles.profileDetailsDuoText2,
          styles.whiteText,
          { textAlign },
          styles.fontWeight500,
        ]}
      >
        {text2}
      </Text>
    </TextButton>
  );
}

ProfileDetailsDuos.defaultProps = {
  textAlign: "center",
  style: {},
};

ProfileDetailsDuos.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textAlign: PropTypes.string,
};

export default ProfileDetailsDuos;
