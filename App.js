import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigators/TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppProvider from './src/providers/AppProvider';

const App = () => {
    return (
        <AppProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <TabNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </AppProvider>
    );
};

export default App;
