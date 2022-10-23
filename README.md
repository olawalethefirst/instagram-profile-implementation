# Instagram Profile Implementation
A React Native implementation of the Instagram Profile Screen feed.

# Project Summary 
The App is built by leveraging on a custom built list component called NestedLists. It illustrates concepts such as remote data fetching & manipulation, state management, and application navigation.

Its data is powered by the [Unsplash API](https://unsplash.com/), but connected through a serverless framework that uses [AWS lamda functions](https://docs.aws.amazon.com/lambda/) and [AWS API Gateway](https://aws.amazon.com/api-gateway/) to provide a back end separation of concern.

# NestedLists
NestedLists was built as an approach to solve the limitation of nesting lists in react native; it enables a one level deep nesting of lists in React Native. It achieves this feat by leveraging on the combined advantage of [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) and [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) to ensure gestures and animation reactions occur strictly on the UI thread. 

# Demo Illustration
![instagram-profile-implementation-small](https://user-images.githubusercontent.com/66824020/197383122-fb4abd82-1708-4baf-b934-8976a2998536.gif)
