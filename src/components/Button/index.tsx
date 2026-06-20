import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from './style';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type ButtonProps = {
    texto: string;
    onPress: () => void;
    bg?: string;
    color?: string;
    width?: number;
    height?:number;
    borderRadius?: number;
    icon?: IconName;
    iconColor?: string;
    borderWidth?: number;
    borderColor?: string;
};

export const Button = ({ texto, onPress, bg, color, width, height, borderRadius, icon, iconColor, borderWidth, borderColor }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.botao,
                bg && { backgroundColor: bg },
                width && { width },
                height && { height },
                borderRadius && { borderRadius },
                (borderWidth || borderColor) && { borderWidth: borderWidth ?? 1, borderColor: borderColor ?? bg ?? '#000' },
            ]}
            onPress={onPress}
        >
            {icon && <Ionicons name={icon} size={20} color={iconColor ?? color ?? styles.texto.color} />}
            <Text style={[styles.texto, color && { color: color }]}>{texto}</Text>
        </TouchableOpacity>
    );
};