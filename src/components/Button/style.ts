import { StyleSheet } from "react-native";
import { theme } from '../../theme';  

export const styles = StyleSheet.create({
    botao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minHeight: 44,
        paddingVertical: 14,
        paddingHorizontal: 26,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.primary,  
    },
    texto: {
        color: theme.colors.textInverseTitle,
        fontSize: 16,
        fontWeight: '700',
    },
});