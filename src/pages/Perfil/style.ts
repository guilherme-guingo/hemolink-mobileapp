import { StyleSheet } from "react-native";
import { theme } from '../../theme'; 

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 40,
        gap: 16,
    },
    foto: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    cardPerfil: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 30,
        margin: 16,
        elevation: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    perfilTopo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    fotoPerfil: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    lapis: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        padding: 4,
    },
    perfilInfo: {
        flex: 1,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.textTitle,
    },
    badges: {
        flexDirection: 'row',
        gap: 6,
        marginTop: 4,
    },
    badgeDoador: {
        backgroundColor: theme.colors.primary,
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 10,
        overflow: 'hidden',
    },
    badgeSangue: {
        backgroundColor: theme.colors.primary,
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 10,
        overflow: 'hidden',
    },
    estatisticas: {
        flexDirection: 'row',
        marginTop: 16,
    },
    estatItem: {
        flex: 1,
        alignItems: 'center',
    },
    estatNumero: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    estatLabel: {
        fontSize: 11,
        color: theme.colors.textMuted,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        position: 'relative',
    },
    fotoPlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
    },
    tituloCard: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.colors.textMuted,
        marginBottom: 0.5,
    },
    tituloLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 8
    },
    editar: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    alerta: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12
    },
    alertaTexto: {
        flex: 1,
    },
    alertaTitulo: {
        fontSize: 13,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    alertaDescricao: {
        fontSize: 13,
        color: theme.colors.textTitle,
        lineHeight: 18,
    },
});