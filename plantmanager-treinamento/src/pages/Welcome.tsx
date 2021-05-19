import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import wateringImg from '../assets/watering.png';

import {
    Text,
    View,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
    SafeAreaView,
} from 'react-native';

export function Welcome() {
    return (
        <SafeAreaView
            style={styles.conteiner}>

            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.background} />

            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                </Text>

                <Image
                    style={styles.image}
                    source={wateringImg}
                    resizeMode='contain' />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 28,
        marginTop: 38,
        lineHeight: 34,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    image: {
        height: Dimensions.get('window').width * 0.7,
    },
});