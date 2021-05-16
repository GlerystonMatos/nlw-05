import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { SvgFromUri } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import {
    Text,
    StyleSheet,
} from 'react-native';

interface CardPlantProps extends RectButtonProps {
    data: {
        Name: string,
        Photo: string,
    }
}

export function PlantCardPrimary({ data, ...rest }: CardPlantProps) {
    return (
        <RectButton
            style={[styles.conteiner]}
            {...rest}>
            <SvgFromUri
                uri={data.Photo}
                width={70}
                height={70} />
            <Text
                style={[styles.text]}>
                {data.Name}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        margin: 10,
        maxWidth: '45%',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: colors.shape,
    },
    text: {
        marginVertical: 16,
        color: colors.green_dark,
        fontFamily: fonts.heading,
    },
});