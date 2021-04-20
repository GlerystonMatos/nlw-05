import React from 'react';
import colors from '../styles/colors';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string,
}

export function Button({ title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            {...rest}>

            <Text style={styles.buttonText}>
                {title}
            </Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 56,
        height: 56,
        marginBottom: 10,
        borderRadius: 16,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: colors.green,
    },
    buttonText: {
        color: colors.white,
        fontSize: 24,
    }
});