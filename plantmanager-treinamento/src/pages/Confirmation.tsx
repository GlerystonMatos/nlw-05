import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { Button } from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/core';

import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

interface ConfirmationParams {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😄',
}

export function Confirmation() {
    const routes = useRoute();
    const navigation = useNavigation();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen,
    } = routes.params as ConfirmationParams;

    function handleMoveOn() {
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView
            style={styles.conteiner}>

            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.background} />

            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button
                        title={buttonTitle}
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
        padding: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 78,
    },
    title: {
        fontSize: 22,
        marginTop: 15,
        lineHeight: 38,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    subtitle: {
        fontSize: 17,
        textAlign: 'center',
        paddingVertical: 10,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    footer: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 50,
    },
});