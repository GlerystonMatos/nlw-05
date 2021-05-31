import fonts from '../styles/fonts';
import colors from '../styles/colors';
import React, { useState } from 'react';
import { Load } from '../components/Load';
import { Header } from '../components/Header';
import waterdrop from '../assets/waterdrop.png';

import {
    Text,
    View,
    Image,
    StatusBar,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export function MyPlants() {
    const [loading, setLoading] = useState<boolean>(false);
    const [nextWaterd, setNextWaterd] = useState<string>('');

    if (loading)
        return (
            <SafeAreaView
                style={styles.conteinerLoad}>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor={colors.background} />
                <Load />
            </SafeAreaView>
        )

    return (
        <SafeAreaView
            style={styles.conteinerView}>

            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.background} />

            <View style={styles.conteiner}>
                <Header />
                <View style={styles.spotLight}>
                    <Image
                        source={waterdrop}
                        style={styles.spotLightImage} />
                    <Text style={styles.spotLightText}>
                        {nextWaterd}
                    </Text>
                </View>
                <View style={styles.plants}>
                    <Text style={styles.plantsTitle}>
                        Próximas regadas
                    </Text>
                    {/* FlatList */}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteinerLoad: {
        flex: 1,
    },
    conteinerView: {
        flex: 1,
    },
    conteiner: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        backgroundColor: colors.background,
    },
    spotLight: {
        height: 110,
        marginTop: 30,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor: colors.blue_light,
    },
    spotLightImage: {
        width: 60,
        height: 60,
    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        marginVertical: 20,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
});