import React from 'react';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { SvgFromUri } from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import {
    Text,
    View,
    Animated,
    StyleSheet,
} from 'react-native';

interface CardPlantProps extends RectButtonProps {
    data: {
        Name: string;
        Photo: string;
        Hour: string;
    };
    handleRemove: () => void;
}

export function PlantCardSecondary({ data, handleRemove, ...rest }: CardPlantProps) {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemover}
                            onPress={handleRemove}>
                            <Feather
                                name='trash'
                                size={32}
                                color={colors.white} />
                        </RectButton>
                    </View>
                </Animated.View>
            )}>
            <RectButton
                style={[styles.conteiner]}
                {...rest}>
                <SvgFromUri
                    uri={data.Photo}
                    width={50}
                    height={50} />
                <Text
                    style={[styles.title]}>
                    {data.Name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.time}>
                        Regar as
                    </Text>
                    <Text style={styles.timeLabel}>
                        {data.Hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        width: '100%',
        borderRadius: 20,
        marginVertical: 5,
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: colors.shape,
    },
    title: {
        flex: 1,
        fontSize: 17,
        marginLeft: 10,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    details: {
        marginRight: 10,
        alignItems: 'flex-end',
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        color: colors.body_dark,
        fontFamily: fonts.heading,
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },
    buttonRemover: {
        right: 20,
        width: 100,
        height: 85,
        marginTop: 15,
        paddingLeft: 15,
        borderRadius: 20,
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: colors.red,
    },
});