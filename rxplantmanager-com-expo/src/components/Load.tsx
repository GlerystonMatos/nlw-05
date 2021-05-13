import React from 'react';
import LottieView from 'lottie-react-native';
import loadAnimation from '../assets/load.json';

import {
    StyleSheet,
    View,
} from 'react-native';

export function Load() {
    return (
        <View style={styles.conteiner}>
            <LottieView
                style={styles.animation}
                source={loadAnimation}
                autoPlay
                loop
            />
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200,
    },
});