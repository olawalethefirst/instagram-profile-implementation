import { Animated } from 'react-native';
import TextButton from './TextButton';
import GridIcon from '../SVG/GridIcon';
import TaggedIcon from '../SVG/TaggedIcon';
import { width } from '../constants';
import styles from './styles';
import PropTypes from 'prop-types';

const PostsHeader = ({ childList, translateY, translateX, scrollX }) => {
    return (
        <Animated.View
            style={[
                {
                    transform: [{ translateY }],
                },
                styles.flexDirectionRow,
                styles.positionAbsolute,
                styles.backgroundColorBlack,
                styles.postsHeader,
            ]}
        >
            <TextButton
                style={[
                    styles.flex1,
                    styles.alignItemsCenter,
                    styles.justifyContentCenter,
                ]}
                onPress={() => childList.current?.scrollToOffset({ offset: 0 })}
            >
                <GridIcon size={24} scrollX={scrollX} />
            </TextButton>
            <TextButton
                style={[
                    styles.flex1,
                    styles.alignItemsCenter,
                    styles.justifyContentCenter,
                ]}
                onPress={() =>
                    childList.current?.scrollToOffset({ offset: width })
                }
            >
                <TaggedIcon size={24} scrollX={scrollX} />
            </TextButton>
            <Animated.View
                style={[
                    {
                        width: width / 2,
                        transform: [{ translateX }],
                    },
                    styles.positionAbsolute,
                    styles.backgroundColorWhite,
                    styles.postsScrollIndicator,
                ]}
            />
        </Animated.View>
    );
};

PostsHeader.propTypes = {
    childList: PropTypes.object,
    translateY: PropTypes.object,
    translateX: PropTypes.object,
    scrollX: PropTypes.object,
};

export default PostsHeader;
