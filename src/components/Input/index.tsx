import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, Text } from 'react-native';
import { getInputStyles } from './styles';

type Props = {
    label?: string;
    placeholder?: string;
    value: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
    maxLength?: number;
    color?: string;
    borderColor?: string;
    focusColor?: string;
    width?: string | number;
    hasError?: boolean;
    errorColor?: string;
    disabled?: boolean;
    paddingLeft?: number;
};

export const Input = ({
    label,
    placeholder,
    value,
    iconLeft,
    iconRight,
    onChangeText,
    secureTextEntry,
    keyboardType,
    maxLength,
    color,
    borderColor,
    focusColor,
    width,
    hasError,
    errorColor,
    disabled,
    paddingLeft,
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
        paddingLeft: paddingLeft ?? (iconLeft ? 36 : 10),
    });

    return (
        <View style={styles.container}>
            {!!label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.wrapper}>
                {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#A0A0A0"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    editable={!disabled}
                    underlineColorAndroid="transparent"
                />
                {iconRight && <TouchableOpacity style={styles.iconRight}>{iconRight}</TouchableOpacity>}
            </View>
        </View>
    );
};
