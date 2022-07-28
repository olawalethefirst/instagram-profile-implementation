import { Text } from 'react-native';
import TextButton from './TextButton';
import styles from './styles';
import PropTypes from 'prop-types';

const ProfileDetailsDuos = ({ text1, text2, style, textAlign }) => {
    return (
        <TextButton style={style}>
            <Text
                style={[
                    styles.profileDetailsDuoText1,
                    styles.whiteText,
                    styles.boldText,
                    { textAlign: textAlign },
                ]}
            >
                {text1}
            </Text>
            <Text
                style={[
                    styles.profileDetailsDuoText2,
                    styles.whiteText,
                    { textAlign: textAlign },
                    styles.fontWeight500,
                ]}
            >
                {text2}
            </Text>
        </TextButton>
    );
};

ProfileDetailsDuos.defaultProps = {
    textAlign: 'center',
};

ProfileDetailsDuos.propTypes = {
    text1: PropTypes.string,
    text2: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    textAlign: PropTypes.string,
};

export default ProfileDetailsDuos;
