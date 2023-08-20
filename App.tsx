import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/localizations/i18nConfig';
import { useAuthentication, logout } from './src/config/firebase';
import { useTranslation } from 'react-i18next';
import Home from './src/screens/Home';
import Login from './src/screens/Login/Login';
import racerReducer from './src/store/slices/racersSlice';

const Stack = createNativeStackNavigator();

const store = configureStore({
    reducer: {
        racers: racerReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export default function App() {
    const { user } = useAuthentication();

    const { t } = useTranslation();

    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Login">
                            {user ? (
                                <Stack.Screen
                                    name="Home"
                                    component={Home}
                                    options={{
                                        title: t('common:appName'),
                                        headerRight: () => (
                                            <Button onPress={logout}>
                                                {t('common:logout')}
                                            </Button>
                                        ),
                                    }}
                                />
                            ) : (
                                <Stack.Screen
                                    name="Login"
                                    component={Login}
                                    options={{
                                        title: t('login:login'),
                                    }}
                                />
                            )}
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </Provider>
        </I18nextProvider>
    );
}
