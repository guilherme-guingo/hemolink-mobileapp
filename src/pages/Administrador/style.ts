import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 30

    },
    heroContainer: {
        overflow: "hidden",
        borderRadius: 16,
        justifyContent: "center",
        height: 160
    },
    //===  HERO SECTION 
    heroAdmImg: {
        width: '100%',
        height: 600,
        objectFit: "cover",
        position: 'absolute',
        top: -180

    },
    HeroTitle: {
        color: 'white',
        fontSize: 26,
        marginBottom: 30
    },
    fullWidthSection: {
        marginHorizontal: -30,
    },


    containerStat: {
        gap: 10,
        marginVertical: 20,
        paddingLeft: 25,
        paddingRight: 25,
    },
    statisticContainer: {
        borderColor: `${theme.colors?.textMuted}70`,
        borderWidth: 1.5,
        backgroundColor: '#fff',
        width: 150,
        height: 100,
        padding: 15,
        borderRadius: 10,
        boxShadow: '0 3px 8px rgba(0,0,0,.12)',
        justifyContent: "space-around",

    },
    filterContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingTop: 4,
        paddingBottom: 10
    },

    titleFilter: {
        fontSize: 30,
        color: `${theme.colors.primary}`,
        fontWeight: 600,
        borderBottomWidth: 2,
        borderColor: `${theme.colors.primary}`,

    },
    cardValue: {
        color: `${theme.colors.primary}`,
        fontWeight: 'bold',
        fontSize: 24
    },
    cardIcon: {
        padding: 8,
        borderRadius: 10,
        position: 'absolute',
        top: 14,
        right: 16
    },
    cartTitle: {
        paddingRight: 8
    },
    containerHospitais: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 160
    },

    loadingContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

})