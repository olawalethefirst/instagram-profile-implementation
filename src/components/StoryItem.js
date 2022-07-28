import { View, Image, Text } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { storyPathParser, storyCaptionParser } from '../constants';
import PlusIcon2 from '../SVG/PlusIcon2';
import TextButton from './TextButton';

const StoryItem = ({ index }) => {
    const last = index === 10;
    return (
        <TextButton style={styles.storyItemContainer}>
            <View
                style={[
                    styles.storyImageContainer1,
                    styles.alignItemsCenter,
                    styles.justifyContentCenter,
                ]}
            >
                <View
                    style={[
                        styles.storyImageContainer2,
                        styles.justifyContentCenter,
                        styles.alignItemsCenter,
                        styles.backgroundColorBlack
                    ]}
                >
                    {!last && (
                        <Image
                            style={styles.storyItemImage}
                            source={storyPathParser(index)}
                        />
                    )}
                    {last && <PlusIcon2 size={20} stroke={1} />}
                </View>
            </View>
            <Text
                numberOfLines={1}
                style={[
                    styles.fontSize13,
                    styles.marginTop8,
                    styles.whiteText,
                    styles.textAlignCenter,
                ]}
                ellipsizeMode={'tail'}
            >
                {storyCaptionParser(index)}
            </Text>
        </TextButton>
    );
};

StoryItem.propTypes = {
    index: PropTypes.number,
};

export default StoryItem;
