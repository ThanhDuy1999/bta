import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import fire from './api/Firebase'

import StartStack from './navigation/Stack';
import { DrawerContent } from './screens/DrawerContent';
import { MainTab } from './navigation/Tab';
import Social from './screens/Social';

const Drawer = createDrawerNavigator();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        this.authListen();
    }

    authListen() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user })
            } else {
                this.setState({ user: null })

            }
        })
    }
    render() {
        return (
            <NavigationContainer>
                {
                    this.state.user !== null ? (
                        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                            <Drawer.Screen name="Home" component={MainTab} />
                            <Drawer.Screen name="Social" component={Social} />
                        </Drawer.Navigator>
                    ) : (
                        <StartStack />
                    )
                }
            </NavigationContainer>
        )
    }
}
export default App;