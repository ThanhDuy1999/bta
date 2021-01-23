import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import MainTicket from '../screens/MainTicket';
import Confirmation from '../screens/Confirmation'
import Movie from '../screens/Movie';
import MovieDetail from '../screens/MovieDetail';

const Tab = createMaterialBottomTabNavigator();
const TicketStack = createStackNavigator();
const MovieStack = createStackNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor='#fff'
            shifting={true}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Event',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: () => (
                        <FontAwesome
                            name="calendar"
                            color={'#fff'}
                            size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Movie"
                component={MovieStackScreen}
                options={{
                    tabBarLabel: 'Movie',
                    tabBarColor: '#694fad',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            name="film"
                            color={'#fff'}
                            size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Ticket"
                component={TicketStackScreen}
                options={{
                    tabBarLabel: 'Ticket',
                    tabBarColor: '#d02860',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            name="ticket"
                            color={'#fff'}
                            size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#d02860',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            name="user"
                            color={'#fff'}
                            size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
export { MainTab };

const TicketStackScreen = ({ navigation }) => {
    return (
        <TicketStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <TicketStack.Screen
                name="Ticket"
                component={MainTicket} />
            <TicketStack.Screen
                name="Confirmation"
                component={Confirmation} />
        </TicketStack.Navigator>
    )
}

const MovieStackScreen = ({ navigation }) => {
    return (
        <MovieStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <MovieStack.Screen
                name="Movie"
                component={Movie} />
            <MovieStack.Screen
                name="Detail"
                component={MovieDetail} />
        </MovieStack.Navigator>
    )
}