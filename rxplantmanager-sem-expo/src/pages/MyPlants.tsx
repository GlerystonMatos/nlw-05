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
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Alert
} from 'react-native';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel',
            },
            {
                text: 'Sim 😢',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);
                        setMyPlants((oldData) =>
                            oldData.filter((item) => item.id !== plant.id)
                        );

                    } catch (error) {
                        Alert.alert('Não foi possivel remover! 😢');
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`
            );

            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();
    }, [])

    if (loading)
        return <Load />

    return (
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
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                            data={item}
                            handleRemove={() => { handleRemove(item) }} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    },
});