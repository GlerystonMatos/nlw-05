import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { formatDistance } from 'date-fns';
import { Load } from '../components/Load';
import { Header } from '../components/Header';
import waterdrop from '../assets/waterdrop.png';
import pt from 'date-fns/esm/locale/pt/index.js';
import React, { useEffect, useState } from 'react';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import {
    View,
    Text,
    Image,
    Alert,
    FlatList,
    StatusBar,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export function MyPlants() {
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWatered] = useState<string>();
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);

    async function loadStorageData() {
        const plantsStoraged = await loadPlant();

        setNextWatered(`Não existem plantas para serem regadas.`);
        if (plantsStoraged.length > 0) {
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].DateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].Name} à ${nextTime} horas.`);
            setMyPlants(plantsStoraged);
        }

        setLoading(false);
    }

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.Name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel',
            },
            {
                text: 'Sim 😢',
                onPress: async () => {
                    try {
                        await removePlant(plant.Id);
                        setMyPlants((oldData) =>
                            oldData.filter((item) => item.Id !== plant.Id)
                        );
                        loadStorageData();
                    } catch (error) {
                        Alert.alert('Não foi possivel remover! 😢');
                    }
                }
            }
        ])
    }

    useEffect(() => {
        loadStorageData();
    }, [])

    if (loading)
        return (
            <SafeAreaView
                style={styles.conteinerLoad}>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor={colors.gray_light} />
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
                    <FlatList
                        data={myPlants}
                        keyExtractor={(item) => String(item.Id)}
                        renderItem={({ item }) => (
                            <PlantCardSecondary
                                data={item}
                                handleRemove={() => { handleRemove(item) }} />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flex: 1 }} />
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
        paddingTop: 50,
        alignItems: 'center',
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        backgroundColor: colors.background,
    },
    spotLight: {
        height: 110,
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