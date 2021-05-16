import fonts from '../styles/fonts';
import colors from '../styles/colors';
import React, { useState } from 'react';
import { format, isBefore } from 'date-fns';
import { Button } from '../components/Button';
import { SvgFromUri } from 'react-native-svg';
import waterdrop from '../assets/waterdrop.png';
import { PlantProps, savePlant } from '../libs/storage';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import {
    Alert,
    Text,
    View,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

interface Params {
    plant: PlantProps;
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const route = useRoute();
    const { plant } = route.params as Params;

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰');
        }

        if (dateTime) {
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                DateTimeNotification: selectedDateTime,
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito Obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants',
            });
        } catch (error) {
            Alert.alert('Não foi possivel salvar. 😢');
        }
    }

    return (
        <SafeAreaView
            style={styles.conteiner}>

            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.gray_light} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.conteiner}>
                <View style={styles.conteiner}>
                    <View style={styles.plantInfo}>
                        <SvgFromUri
                            uri={plant.Photo}
                            height={150}
                            width={150} />

                        <Text style={styles.plantName}>
                            {plant.Name}
                        </Text>
                        <Text style={styles.plantAbout}>
                            {plant.About}
                        </Text>
                    </View>

                    <View style={styles.controller}>
                        <View style={styles.tipContainer}>
                            <Image
                                source={waterdrop}
                                style={styles.tipImage} />
                            <Text style={styles.tipText}>
                                {plant.WaterTips}
                            </Text>
                        </View>

                        <Text style={styles.alertLabel}>
                            Escolha o melhor horário para ser lembrado:
                        </Text>

                        {
                            showDatePicker && (
                                <DateTimePicker
                                    value={selectedDateTime}
                                    mode='time'
                                    display='spinner'
                                    onChange={handleChangeTime} />
                            )
                        }

                        {
                            Platform.OS === 'android' && (
                                <TouchableOpacity
                                    style={styles.dateTimePickerButton}
                                    onPress={handleOpenDateTimePickerForAndroid}>
                                    <Text style={styles.dateTimePickerText}>
                                        {`Mudar Horário ${format(selectedDateTime, 'HH:mm')}`}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }

                        <Button
                            title='Cadastrar planta'
                            onPress={handleSave} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: colors.shape,
        justifyContent: 'space-between',
    },
    plantInfo: {
        flex: 1,
        paddingVertical: 50,
        alignItems: 'center',
        paddingHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    plantName: {
        fontSize: 24,
        marginTop: 15,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    plantAbout: {
        fontSize: 17,
        marginTop: 10,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.text,
    },
    controller: {
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        paddingBottom: getBottomSpace() || 20,
    },
    tipContainer: {
        bottom: 60,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.blue_light,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        fontSize: 17,
        marginLeft: 20,
        textAlign: 'justify',
        fontFamily: fonts.text,
        color: colors.blue,
    },
    alertLabel: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.complement,
    },
    dateTimePickerButton: {
        width: '100%',
        paddingVertical: 40,
        alignItems: 'center',
    },
    dateTimePickerText: {
        fontSize: 24,
        color: colors.heading,
        fontFamily: fonts.text,
    },
});