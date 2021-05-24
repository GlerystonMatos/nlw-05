import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { Header } from '../components/Header';

import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export function PlantSelect() {
    return (
        <SafeAreaView
            style={styles.conteinerView}>

            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.background} />

            <View style={styles.conteiner}>
                <View style={styles.header}>
                    <Header />
                    <Text style={styles.title}>Em qual ambiente</Text>
                    <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
                </View>
                <View style={styles.enviromentMenu}>

                </View>
                <View style={styles.plants}>

                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    conteinerView: {
        flex: 1,
    },
    conteiner: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        marginTop: 15,
        lineHeight: 20,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    subtitle: {
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    enviromentMenu: {
        alignItems: 'center',
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
});