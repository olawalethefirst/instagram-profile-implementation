import { Text } from "react-native";
import Animated, {
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useSharedValue,
} from "react-native-reanimated";
import { useState, useCallback, useEffect, memo } from "react";
import PropTypes from "prop-types";
import parseErrorMessage from "../helperFunctions/parseErrorMessage";
import AlertIcon from "../svg/AlertIcon";
import styles from "./styles";

function ErrorModal({ errors, deleteMostRecentError }) {
  // hooks
  const [errorsShownCount, setErrorsShownCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const UIThreadErrorsLength = useSharedValue(errors.length);

  // variables
  const errorLength = errors.length;
  UIThreadErrorsLength.value = errorLength;
  // helperFunctions
  const onErrorModalMount = useCallback(() => {
    setErrorsShownCount((count) => count + 1);
    deleteMostRecentError();
  }, [deleteMostRecentError]);
  const onErrorModalUnMount = useCallback(() => {
    if (UIThreadErrorsLength.value === 0) {
      setVisible(false);
      setErrorsShownCount(0);
    }
  }, [UIThreadErrorsLength]);

  useEffect(() => {
    if (errors.length && !visible) {
      setVisible(true);
    }
  }, [errors, visible]);

  return visible ? (
    <Animated.View
      entering={(errorsShownCount > 0
        ? SlideInDown.delay(2500).duration(500)
        : SlideInDown.duration(500)
      ).withCallback((completed) => {
        "worklet";

        if (completed) {
          runOnJS(onErrorModalMount)();
        }
      })}
      exiting={SlideOutDown.delay(2000)
        .duration(500)
        .withCallback(() => {
          "worklet";

          runOnJS(onErrorModalUnMount)();
        })}
      key={errorsShownCount}
      style={styles.errorModal}
    >
      <AlertIcon size={25} containerStyles={styles.alertIcon} />
      <Text style={styles.errorModalText}>{parseErrorMessage(errors[0])}</Text>
    </Animated.View>
  ) : null;
}

ErrorModal.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteMostRecentError: PropTypes.func.isRequired,
};

export default memo(ErrorModal);
