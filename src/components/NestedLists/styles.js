import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  zIndex1: {
    zIndex: 1,
  },
  refreshContainer: {
    position: "absolute",
    top: 5,
    left: "50%",
  },
  stickyHeaderButtonsContainer: {
    height: 50,
    flexDirection: "row",
    bottomPadding: 2,
  },
  horizontalScrollIndicator: {
    bottom: 0,
    height: 2,
  },
  stickyHeaderButtonContainer: {
    flex: 1,
  },
  stickyHeaderButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
});
