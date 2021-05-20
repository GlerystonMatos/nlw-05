import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import wateringImg from '../assets/watering.png';
import Feather from 'react-native-vector-icons/Feather';

import {
    Text,
    View,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

export function Welcome() {

    function handleStart() {
    }

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

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}>
                    <Text>
                        <Feather
                            name='chevron-right'
                            style={styles.buttonIcon} />
                    </Text>
                </TouchableOpacity>
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
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 16,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green,
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white,
    },
});