import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import * as Notifications from 'expo-notifications';

import {
    Text,
    View,
    Alert,
    StatusBar,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export function Options() {

    async function handleNotificationList() {
        const data = await Notifications.getAllScheduledNotificationsAsync();

        let notificacoesAgendadas = '';
        data.map(item => {
            notificacoesAgendadas +=
                item.content.body + '\n\n';
        });

        Alert.alert('Notificações agendadas ⏰', notificacoesAgendadas);
    }

    async function handleNotificationCancel() {
        await Notifications.cancelAllScheduledNotificationsAsync();
        Alert.alert('Todas as notificações agendadas foram canceladas ⏰');
    }

    return (
        <SafeAreaView
            style={styles.conteinerView}>

            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.background} />

            <View style={styles.conteiner}>
                <Header />
                <View style={styles.options}>
                    <Text style={styles.optionsTitle}>
                        Opções
                    </Text>

                    <Button
                        style={styles.buttonList}
                        title='Listar Notificações'
                        onPress={handleNotificationList} />

                    <Button
                        title='Remover Notificações'
                        onPress={handleNotificationCancel} />
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
        paddingTop: 50,
        alignItems: 'center',
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        backgroundColor: colors.background,
    },
    options: {
        flex: 1,
        width: '100%',
    },
    optionsTitle: {
        fontSize: 24,
        marginVertical: 20,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    buttonList: {
        marginBottom: 10,
    },
});