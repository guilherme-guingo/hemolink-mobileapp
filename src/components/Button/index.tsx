import { TouchableOpacity, Text } from "react-native";
import { styles } from './style';

type ButtonProps = {
    texto: string;
    onPress: () => void;
    bg?: string;
    color?: string;
};

export const Button = ({ texto, onPress, bg, color }: ButtonProps) => {
    return (
        <TouchableOpacity 
            style={[styles.botao, bg && { backgroundColor: bg }]} 
            onPress={onPress}
        >
            <Text style={[styles.texto, color && { color: color }]}>{texto}</Text>
        </TouchableOpacity>
    );
};