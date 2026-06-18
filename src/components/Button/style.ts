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
        borderRadius: 8,
        backgroundColor: '#c00',  
    },
    texto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});