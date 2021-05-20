import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

import {
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, style, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[style, styles.conteiner]}
            {...rest}>
            <Text style={styles.texto}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green,
    },
    texto: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading,
    },
})