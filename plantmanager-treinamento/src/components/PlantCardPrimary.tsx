import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { SvgFromUri } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import {
    Text,
    StyleSheet,
} from 'react-native';

type DataProps = {
    Name: string;
    Photo: string;
}

interface PlantCardPrimaryProps extends RectButtonProps {
    data: DataProps;
}

export function PlantCardPrimary({ data, ...rest }: PlantCardPrimaryProps) {
    return (
        <RectButton
            style={styles.conteiner}
            {...rest}>
            <SvgFromUri
                width={70}
                height={70}
                uri={data.Photo} />
            <Text
                style={styles.text}>
                {data.Name}
            </Text>
        </RectButton>
    );
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