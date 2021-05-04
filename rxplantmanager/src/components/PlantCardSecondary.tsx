import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { SvgFromUri } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface CardPlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    }
}

export function PlantCardSecondary({ data, ...rest }: CardPlantProps) {
    return (
        <RectButton
            style={[styles.conteiner]}
            {...rest}>
            <SvgFromUri
                uri={data.photo}
                width={50}
                height={50} />
            <Text
                style={[styles.title]}>
                {data.name}
            </Text>
            <View style={styles.details}>
                <Text style={styles.time}>
                    Regar as
                </Text>
                <Text style={styles.timeLabel}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
    },
    details: {
        alignItems: 'flex-end',
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },
});