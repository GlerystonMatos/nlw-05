import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { SvgFromUri } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import {
    StyleSheet,
    Text,
} from 'react-native';

interface CardPlantProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
    }
}

export function PlantCardPrimary({ data, ...rest }: CardPlantProps) {
    return (
        <RectButton
            style={[styles.conteiner]}
            {...rest}>
            <SvgFromUri
                uri={data.photo}
                width={70}
                height={70} />
            <Text
                style={[styles.text]}>
                {data.name}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10,
    },
    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
    },
});