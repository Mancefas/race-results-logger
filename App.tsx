import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthentication, logout } from "./src/config/firebase";
import { Button } from "react-native-paper";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAuthentication();  

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? 
        <Stack.Screen name="Home" component={Home}
         options={{
          title: 'My home',
          headerRight: () => (
           <Button onPress={logout}>
            Logout
           </Button>
          ),
        }} />
        : 
        <Stack.Screen name="Login" 
                      component={Login} 
                      options={{
                        title: 'Prisijungti'
                      }} /> }
      </Stack.Navigator>

    </NavigationContainer>
    </SafeAreaProvider>
  );
}

