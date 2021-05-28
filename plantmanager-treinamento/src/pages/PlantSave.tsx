import fonts from '../styles/fonts';
import colors from '../styles/colors';
import React, { useState } from 'react';
import { format, isBefore } from 'date-fns';
import { PlantProps } from '../libs/storage';
import { SvgFromUri } from 'react-native-svg';
import { Button } from '../components/Button';
import waterdrop from '../assets/waterdrop.png';
import { useRoute } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import {
    Text,
    View,
    Image,
    Alert,
    Platform,
    StatusBar,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

interface PlantSaveParams {
    plant: PlantProps;
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(Platform.OS === 'ios');

    const route = useRoute();
    const { plant } = route.params as PlantSaveParams;

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldValue => !oldValue);
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
        setShowDatePicker(oldValue => !oldValue);
    }

    function handleSave() {
        try {

        } catch {
            Alert.alert('Não foi possível salvar. 😢');
        }
    }

    return (
        <SafeAreaView
            style={styles.conteiner}>

            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.shape} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.conteiner} >
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        height={150}
                        width={150}
                        uri={plant.Photo} />

                    <Text style={styles.plantName}>
                        {plant.Name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.About}
                    </Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipConteiner}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage} />
                        <Text style={styles.tipText}>
                            {plant.WaterTips}
                        </Text>
                    </View>

                    <Text style={styles.altertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {
                        showDatePicker && (
                            <DateTimePicker
                                mode='time'
                                display='spinner'
                                value={selectedDateTime}
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
                        onPress={handleSave}
                        title='Cadastrar planta' />
                </View>
            </ScrollView>

        </SafeAreaView>
    );
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
    tipConteiner: {
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
        color: colors.blue,
        textAlign: 'justify',
        fontFamily: fonts.text,
    },
    altertLabel: {
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