import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useAuthentication, logout } from './src/config/firebase';
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

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        {user ? (
                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{
                                    title: 'My home',
                                    headerRight: () => (
                                        <Button onPress={logout}>Logout</Button>
                                    ),
                                }}
                            />
                        ) : (
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{
                                    title: 'Prisijungti',
                                }}
                            />
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}
