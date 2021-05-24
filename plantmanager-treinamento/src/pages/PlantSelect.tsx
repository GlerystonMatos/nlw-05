import api from '../services/api';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { Header } from '../components/Header';
import React, { useEffect, useState } from 'react';
import { EnviromentsButton } from '../components/EnviromentButton';

import {
    View,
    Text,
    Alert,
    FlatList,
    StatusBar,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

interface EnviromentsProps {
    Key: string;
    Title: string;
}

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentsProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState<string>('all');

    function handleEnviromentsSelected(enviroment: string) {
        setEnviromentSelected(enviroment);
    }

    useEffect(() => {
        async function fetchEnviroment() {
            let data: EnviromentsProps[];
            data = await api.get('/OData/PlantEnvironment?$orderby=title asc')
                .then(response => {
                    return response.data.value;
                })
                .catch(error => {
                    Alert.alert('Não foi possível obter a lista dos ambientes das plantas. 😥', String(error));
                    return [];
                });

            setEnviroments([
                {
                    Key: 'all',
                    Title: 'Todos',
                },
                ...data,
            ]);
        }

        fetchEnviroment();
    }, []);

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
                            <EnviromentsButton
                                title={item.Title}
                                active={item.Key === enviromentSelected}
                                onPress={() => handleEnviromentsSelected(item.Key)} />
                        )} />
                </View>
                <View style={styles.plants}>

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
        paddingHorizontal: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
    enviromentList: {
        height: 40,
        marginTop: 30,
        paddingBottom: 5,
        marginBottom: 25,
        justifyContent: 'center',
    },
});