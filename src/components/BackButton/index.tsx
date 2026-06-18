import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { theme } from '../../theme';  

type BackButtonProps = {
    onPress: () => void;
};

export const BackButton = ({ onPress }: BackButtonProps) => {
    return (
        <TouchableOpacity style={styles.backBtn} onPress={onPress}>
            <Ionicons name="arrow-back" size={20} color={theme.colors.secondary} />
            <Text style={styles.texto}>Voltar</Text>
        </TouchableOpacity>
    );
};