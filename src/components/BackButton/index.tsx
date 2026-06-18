import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

type BackButtonProps = {
    location: string;
};

export const BackButton = ({ location }: BackButtonProps) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate(location)}>
            <Ionicons name="arrow-back" size={20} color="#..." />
            <Text style={styles.texto}>Voltar</Text>
        </TouchableOpacity>
    );
};