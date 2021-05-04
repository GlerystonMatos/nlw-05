import api from '../services/api';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { Load } from '../components/Load';
import { PlantProps } from '../libs/storage';
import { Header } from '../components/Header';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';

interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [enviroments, setEnviroment] = useState<EnviromentProps[]>([]);
    const [enviromentsSelected, setEnviromentsSelected] = useState('all');
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);

    const navigation = useNavigation();

    function handleEnviromentsSelected(enviroment: string) {
        setEnviromentsSelected(enviroment);

        if (enviroment === 'all') {
            return setFilteredPlants(plants);
        }

        const filtered = plants.filter(plants =>
            plants.environments.includes(enviroment));

        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        const { data } = await api
            .get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`);

        if (!data)
            return setLoading(true);

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if (distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api
                .get('plants_environments?_sort=title&order=asc');
            setEnviroment([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data,
            ]);
        }

        fetchEnviroment();
    }, [])

    useEffect(() => {
        fetchPlants();
    }, [])

    if (loading)
        return <Load />
    return (
        <View style={styles.conteiner}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList
                    horizontal
                    data={enviroments}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item.key)}
                    contentContainerStyle={styles.enviromentList}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key === enviromentsSelected}
                            onPress={() => handleEnviromentsSelected(item.key)} />
                    )} />
            </View>
            <View style={styles.plants}>
                <FlatList
                    numColumns={2}
                    data={filteredPlants}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}
                    onEndReached={({ distanceFromEnd }) =>
                        handleFetchMore(distanceFromEnd)
                    }
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item)} />
                    )}
                    ListFooterComponent={
                        loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
});