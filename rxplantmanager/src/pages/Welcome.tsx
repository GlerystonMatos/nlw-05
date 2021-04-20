import colors from '../styles/colors';
import React, { useState } from 'react';
import { Button } from '../components/Button';
import wateringImg from '../assets/watering.png';
import { Text, View, Image, StyleSheet } from 'react-native';

export function Welcome() {
    const [visible, setVisible] = useState(false);

    function handleVisibilit() {
        setVisible(true);
    }

    return (
        <View style={styles.conteiner}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas de {'\n'}
                forma fácil
            </Text>

            {
                visible &&
                <Image
                    style={styles.image}
                    source={wateringImg} />
            }

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <Button title='>' />
        </View>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
        marginTop: 38,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.heading,
    },
    image: {
        width: 292,
        height: 284,
    },
});