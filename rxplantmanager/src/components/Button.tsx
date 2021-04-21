import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

interface ButtonsProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, ...rest }: ButtonsProps) {
    return (
        <TouchableOpacity
            style={styles.conteiner}
            {...rest}>

            <Text style={styles.texto}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading,
    },
});