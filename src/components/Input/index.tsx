import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput } from 'react-native';
import { getInputStyles } from './styles';

type Props = {
    placeholder?: string;
    value: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    color?: string;
    borderColor?: string;
    focusColor?: string;
    width?: string | number;
    hasError?: boolean;
    errorColor?: string;
    disabled?: boolean; //vamos usar quando precis de uma condição pra ativar input
};

export const Input = ({
    placeholder,
    value,
    iconLeft,
    iconRight,
    onChangeText,
    secureTextEntry,
    color,
    borderColor,
    focusColor,
    width,
    hasError,
    errorColor,
    disabled,
}: Props) => {
    const [isFocused, setIsFocused] = useState(false);

    const styles = getInputStyles({
        color,
        borderColor,
        focusColor,
        width,
        hasError,
        errorColor,
        isFocused,
        disabled,
    });

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                {/* iconesLeft para lupa, nome ou senha, etcs */}
                {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>} 
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#A0A0A0"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    editable={!disabled}
                    underlineColorAndroid="transparent"
                />
                {/* Olhinho da senha */}
                {iconRight && <TouchableOpacity style={styles.iconRight}>{iconRight}</TouchableOpacity>}
            </View>
        </View>
    );
};
