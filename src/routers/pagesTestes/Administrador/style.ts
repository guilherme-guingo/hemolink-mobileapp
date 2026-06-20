import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 30

    },
    //===  HERO SECTION 
    heroAdmImg: {
        width: '100%',
        height: 400,
        position: 'absolute',
        top: -160

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
        width: 140,
        height: 120,
        padding: 15,
        borderRadius: 10,
        boxShadow: '0 3px 10px rgba(0,0,0,.12)'
    },
    cardValue: {
        color: `${theme.colors.primary}`,
        fontWeight: 'bold',
        fontSize: 24
    },
    containerHospitais: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom:160
    }

})