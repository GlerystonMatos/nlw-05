import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import userImg from '../assets/gleryston.png';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';

export function Header() {
    return (
        <View style={styles.conteiner}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Gleryston</Text>
            </View>

            <Image
                source={userImg}
                style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
    }
});