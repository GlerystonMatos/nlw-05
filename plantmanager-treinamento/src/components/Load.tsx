import React from 'react';
import LottieView from 'lottie-react-native';
import loadAnimation from '../assets/load.json';

import {
    View,
    StyleSheet,
} from 'react-native';

export function Load() {
    return (
        <View style={styles.conteiner}>
            <LottieView
                loop
                autoPlay
                source={loadAnimation}
                style={styles.animation} />
        </View>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: 200,
        height: 200,
        backgroundColor: 'transparent',
    },
});