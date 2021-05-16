import React from 'react';
import colors from '../styles/colors';
import AuthRoutes from './tab.routes';
import { Welcome } from '../pages/Welcome';
import { PlantSave } from '../pages/PlantSave';
import { Confirmation } from '../pages/Confirmation';
import { createStackNavigator } from '@react-navigation/stack';
import { UserIdentification } from '../pages/UserIdentification';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white,
            }
        }}>
        <stackRoutes.Screen
            name='Welcome'
            component={Welcome} />
        <stackRoutes.Screen
            name='UserIdentification'
            component={UserIdentification} />
        <stackRoutes.Screen
            name='Confirmation'
            component={Confirmation} />
        <stackRoutes.Screen
            name='PlantSelect'
            component={AuthRoutes} />
        <stackRoutes.Screen
            name='PlantSave'
            component={PlantSave} />
        <stackRoutes.Screen
            name='MyPlants'
            component={AuthRoutes} />
    </stackRoutes.Navigator>
)

export default AppRoutes;