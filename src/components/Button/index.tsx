import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from './style';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type ButtonProps = {
    texto: string;
    onPress: () => void;
    bg?: string;
    color?: string;
    width?: number;
    height?: number;
    borderRadius?: number;
    icon?: IconName;
    iconColor?: string;
    borderWidth?: number;
    borderColor?: string;
    centerIcon?: boolean;
};

export const Button = ({ texto, onPress, bg, color, width, height, borderRadius, icon, iconColor, borderWidth, borderColor, centerIcon }: ButtonProps) => {
    const soIcon = !texto && icon
    return (
        <TouchableOpacity
            style={[
                styles.botao,
                bg && { backgroundColor: bg },
                width && { width },
                height && { height },
                borderRadius && { borderRadius },
                soIcon && { paddingHorizontal: 0 },
                centerIcon && { justifyContent: 'center' },
                (borderWidth || borderColor) && { borderWidth: borderWidth ?? 1, borderColor: borderColor ?? bg ?? '#000' },
            ]}
            onPress={onPress}
        >
            {icon && centerIcon ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={icon} size={20} color={iconColor ?? color ?? styles.texto.color} />
                </View>
            ) : (
                icon && <Ionicons name={icon} size={20} color={iconColor ?? color ?? styles.texto.color} />
            )}
            {!!texto && <Text style={[styles.texto, color && { color: color }]}>{texto}</Text>}
        </TouchableOpacity>
    );
};