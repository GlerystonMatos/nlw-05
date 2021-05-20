import fonts from '../styles/fonts';
import colors from '../styles/colors';
import React, { useState } from 'react';
import { Button } from '../components/Button';

import {
    Text,
    View,
    Platform,
    Keyboard,
    TextInput,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native';

export function UserIdentification() {
    const [name, setName] = useState<string>('');
    const [isFilled, setIsFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);

    }

    function handleSubmit() {

    }

    return (
        <SafeAreaView
            style={styles.conteiner}>

            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.background} />

            <KeyboardAvoidingView
                style={styles.conteiner}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}>

                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😄' : '😀'}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder='Digite um nome'
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange} />

                            <View style={styles.footer}>
                                <Button
                                    title='Confirmar'
                                    onPress={handleSubmit} />
                            </View>
                        </View>
                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 54,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44,
    },
    input: {
        padding: 10,
        fontSize: 18,
        marginTop: 50,
        width: '100%',
        textAlign: 'center',
        borderBottomWidth: 1,
        color: colors.heading,
        borderColor: colors.gray,
    },
    title: {
        fontSize: 24,
        marginTop: 20,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    },
});