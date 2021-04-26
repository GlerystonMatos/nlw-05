import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/core';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export function Confirmation() {
    const navigation = useNavigation();

    function handleMoveOn() {
        navigation.navigate('PlantSelect');
    }

    return (
        <SafeAreaView style={styles.conteiner}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😄
                </Text>

                <Text style={styles.title}>
                    Prontinho
                </Text>

                <Text style={styles.subtile}>
                    Agora vamos começar a cuidar das suas
                    plantinhas com muito cuidado.
                </Text>

                <View style={styles.footer}>
                    <Button
                        title='Começar'
                        onPress={handleMoveOn} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },
    emoji: {
        fontSize: 78,
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },
    subtile: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20,
    },
});