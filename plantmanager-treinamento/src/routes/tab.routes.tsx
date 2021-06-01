import React from 'react';
import colors from '../styles/colors';
import { Platform } from 'react-native';
import { Options } from '../pages/Options';
import { MyPlants } from '../pages/MyPlants';
import { PlantSelect } from '../pages/PlantSelect';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88,
                }
            }}>
            <AppTab.Screen
                name='Nova Planta'
                component={PlantSelect}
                options={{
                    tabBarIcon: (({ color, size }) => (
                        <MaterialIcons
                            size={size}
                            color={color}
                            name='add-circle-outline' />
                    ))
                }} />
            <AppTab.Screen
                name='Minhas Plantas'
                component={MyPlants}
                options={{
                    tabBarIcon: (({ color, size }) => (
                        <MaterialIcons
                            size={size}
                            color={color}
                            name='format-list-bulleted' />
                    ))
                }} />
            <AppTab.Screen
                name='Opções'
                component={Options}
                options={{
                    tabBarIcon: (({ color, size }) => (
                        <MaterialIcons
                            size={size}
                            color={color}
                            name='settings' />
                    ))
                }} />
        </AppTab.Navigator>
    );
}

export default AuthRoutes;