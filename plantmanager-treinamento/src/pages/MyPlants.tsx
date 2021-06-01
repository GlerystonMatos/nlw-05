import fonts from '../styles/fonts';
import { pt } from 'date-fns/locale';
import colors from '../styles/colors';
import { formatDistance } from 'date-fns';
import { Load } from '../components/Load';
import { Header } from '../components/Header';
import waterdrop from '../assets/waterdrop.png';
import React, { useEffect, useState } from 'react';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import {
    Text,
    View,
    Image,
    Alert,
    FlatList,
    StatusBar,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export function MyPlants() {
    const [loading, setLoading] = useState<boolean>(true);
    const [nextWaterd, setNextWaterd] = useState<string>('');
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);

    async function loadStorageData() {
        const plantsStoraged = await loadPlant();
        setNextWaterd('Não existem plantas para serem regadas.');

        if (plantsStoraged.length > 0) {
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].DateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWaterd(`Não esqueça de regar a ${plantsStoraged[0].Name} à ${nextTime}.`);
            setMyPlants(plantsStoraged);
        }

        setLoading(false);
    }

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Dedeja remover a ${plant.Name}`, [
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
                            oldData.filter((item) => item.Id !== plant.Id));
                        loadStorageData();
                    } catch {
                        Alert.alert('Não foi possivel remover! 😢');
                    }
                }
            }
        ]);
    }

    useEffect(() => {
        loadStorageData();
    }, []);

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
                    <FlatList
                        data={myPlants}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flex: 1, }}
                        keyExtractor={(item) => String(item.Id)}
                        renderItem={({ item }) => (
                            <PlantCardSecondary
                                data={item}
                                onRemove={() => { handleRemove(item) }} />
                        )} />
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