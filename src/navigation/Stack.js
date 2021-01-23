import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Loading from '../screens/Loading';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
// import Movie from '../screens/Movie';
// import Confirmation from '../screens/Confirmation';
// import { MainTab } from './Tab';

const Stack = createStackNavigator();

const StartStack = ({navigation}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Loading">
            <Stack.Screen
                name="Loading"
                component={Loading} />
            <Stack.Screen
                name="Welcome"
                component={Welcome} />
            <Stack.Screen
                name="Login"
                component={Login} />
            <Stack.Screen
                name="Signup"
                component={Signup} />
            {/* <Stack.Screen
                name="Home"
                component={MainTab} />
            <Stack.Screen
                name="Confirmation"
                component={Confirmation} />
            <Stack.Screen
                name="Movie"
                component={Movie} /> */}
        </Stack.Navigator>
    )
}
export default StartStack ;