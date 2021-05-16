import fonts from '../styles/fonts';
import colors from '../styles/colors';
import userImg from '../assets/user.png';
import glerystonImg from '../assets/gleryston.png';
import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';

export function Header() {
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@rxplantmanager:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    }, []);

    return (
        <View style={styles.conteiner}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>

            {
                userName === 'Gleryston'
                    ? <Image
                        source={glerystonImg}
                        style={styles.image} />
                    : <Image
                        source={userImg}
                        style={styles.image} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        width: '100%',
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        lineHeight: 40,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
    }
});