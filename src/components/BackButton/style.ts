import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    texto: {
        color: 'theme.colors.secondary',
        fontSize: 16,
        fontWeight: '600',
    },
});