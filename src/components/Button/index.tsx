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
    paddingVertical?: number;
    paddingHorizontal?: number;
    fontSizeTexto?:number;
    disabled?: boolean;
};

export const Button = ({ texto, onPress, bg, color, width, height, borderRadius, icon, iconColor, borderWidth, borderColor, centerIcon, paddingVertical, paddingHorizontal, fontSizeTexto, disabled }: ButtonProps) => {
    const soIcon = !texto && icon
    return (
        <TouchableOpacity
            onPress={disabled ? undefined : onPress}
            activeOpacity={disabled ? 1 : 0.7}
            style={[
                styles.botao,
                bg && { backgroundColor: bg },
                width !== undefined && { width },
                height !== undefined && { height },
                borderRadius !== undefined && { borderRadius },
                soIcon && { paddingHorizontal: 0 },
                paddingVertical !== undefined && { paddingVertical },
                paddingHorizontal !== undefined && { paddingHorizontal },
                centerIcon && { justifyContent: 'center' },
                borderColor !== undefined && { borderWidth: borderWidth ?? 1, borderColor },
                disabled && { opacity: 0.5 },
            ]}
        >
            {icon && centerIcon ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={icon} size={20} color={iconColor ?? color ?? styles.texto.color} />
                </View>
            ) : (
                icon && <Ionicons name={icon} size={20} color={iconColor ?? color ?? styles.texto.color} />
            )}
            {!!texto && <Text style={[styles.texto, color && { color: color }, !!fontSizeTexto && { fontSize: fontSizeTexto }]}>{texto}</Text>}
        </TouchableOpacity>
    );
};