import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerDesignScreen from './DrawerDesignScreen';
import HomeIndex from '../containers/home_container';

const Drawer = createDrawerNavigator();
export default function DrawerPage() {
    return (
        <Drawer.Navigator
            drawerStyle={{ width: "80%" }}
            // drawerType="slide"
            statusBarAnimation="slide"
            drawerContent={props =>
                <DrawerDesignScreen {...props} />}>
            <Drawer.Screen name="GetItDone" component={HomeIndex} />
        </Drawer.Navigator>
    )
}