import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import {
    StyleSheet,
    Text,
} from 'react-native';

interface EnviromentButtonProps extends RectButtonProps {
    title: string,
    active?: boolean,
}

export function EnviromentButton({
    title,
    active = false,
    ...rest
}: EnviromentButtonProps) {
    return (
        <RectButton
            style={[
                styles.conteiner,
                active ? styles.conteinerActive : null,
            ]}
            {...rest}>
            <Text style={[
                styles.text,
                active ? styles.textActive : null,
            ]}>{title}</Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5,
    },
    conteinerActive: {
        backgroundColor: colors.green_light,
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text,
    },
    textActive: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
    },
});