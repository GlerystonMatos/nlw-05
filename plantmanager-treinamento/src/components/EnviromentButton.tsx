import React from 'react';
import colors from '../styles/colors';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import {
    Text,
    StyleSheet,
} from 'react-native';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnviromentsButton({
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
    );
}

const styles = StyleSheet.create({
    conteiner: {
        width: 70,
        height: 40,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    conteinerActive: {
        backgroundColor: colors.green_light,
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text,
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
    },
});