import { StyleSheet } from "react-native";
import { theme } from "../../theme";


export const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 30,
        backgroundColor:'#F6FAFF',
    },
    pointsContainer: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    heroSquare: {
        width: '100%',
        height: 800,
        backgroundColor: `${theme.colors.primary}`,
        position: 'absolute',
        top: 0,
    },
    gifIcon: {
        position: 'absolute',
        right: 16,
        top: 10,
        transform: [
            { rotate: '10deg' }
        ]

    },
    textWhite: {
        color: `${theme.colors.terciary}`,
    },
    points: {
        fontSize: 22,
        marginTop: -8,
        fontWeight: '600'
    },
    fullWidthSection: {
        marginHorizontal: -30,
    },
    categoriesContainer: {
        margin: 0,
        marginHorizontal: 10,
    },
    shopItensContainer: {
        backgroundColor: `${theme.colors.terciary}`,
        padding: 10,
        borderRadius: 8,
        gap:10,
        flexDirection: 'row',
        alignItems:'center',
        boxShadow: '0 3px 8px rgba(0,0,0,.12)',
    },
    shopItensCard: {
        borderRadius: 8,
        height: 70,
        width: 120,
        objectFit: "fill"
    },
    Icon:{
        marginRight:12
    },
    pointCard:{
        color:`${theme.colors.primary}`,
        fontWeight:600
    }

})