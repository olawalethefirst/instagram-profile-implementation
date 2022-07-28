import { TouchableOpacity } from 'react-native';
import { activeOpacity } from '../constants';
import PropTypes from 'prop-types';

const TextButton = ({ children, onPress, style }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={activeOpacity}
            style={style}
        >
            {children}
        </TouchableOpacity>
    );
};

TextButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default TextButton;
