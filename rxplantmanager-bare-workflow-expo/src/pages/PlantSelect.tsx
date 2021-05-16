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
    Alert,
    FlatList,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';

interface EnviromentProps {
    Key: string;
    Title: string;
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
            plants.Environments.includes(enviroment));

        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        const quantidadeRegistrosPorPagina = 8;
        const quantidadeParaPular = page ? ((page * quantidadeRegistrosPorPagina) - quantidadeRegistrosPorPagina) : 0;

        let data: PlantProps[];
        data = await api.get(`/OData/Plant?$expand=frequency&$top=${quantidadeRegistrosPorPagina}&$skip=${quantidadeParaPular}&$orderby=name asc`)
            .then(response => {
                return response.data.value;
            })
            .catch(error => {
                Alert.alert('Não foi possível obter a lista das plantas. 😥', String(error));
                return [];
            });

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
            let data: EnviromentProps[];
            data = await api.get('/OData/PlantEnvironment?$orderby=title asc')
                .then(response => {
                    return response.data.value;
                })
                .catch(error => {
                    Alert.alert('Não foi possível obter a lista dos ambientes das plantas. 😥', String(error));
                    return [];
                });

            setEnviroment([
                {
                    Key: 'all',
                    Title: 'Todos',
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
                <View style={styles.header}>
                    <Header />
                    <Text style={styles.title}>Em qual ambiente</Text>
                    <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
                </View>
                <View style={styles.enviromentMenu}>
                    <FlatList
                        horizontal
                        data={enviroments}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => String(item.Key)}
                        contentContainerStyle={styles.enviromentList}
                        renderItem={({ item }) => (
                            <EnviromentButton
                                title={item.Title}
                                active={item.Key === enviromentsSelected}
                                onPress={() => handleEnviromentsSelected(item.Key)} />
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
                        keyExtractor={(item) => String(item.Id)}
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
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        marginTop: 15,
        lineHeight: 20,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    subtitle: {
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    enviromentMenu: {
        alignItems: 'center',
    },
    enviromentList: {
        height: 40,
        paddingBottom: 5,
        marginTop: 30,
        marginBottom: 25,
        justifyContent: 'center',
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
});