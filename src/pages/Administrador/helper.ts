import { theme } from "../../theme";

export const filtrosHospital = [
    {
        id: 1,
        texto: 'Tudo',
        icon: undefined,
        bg: '#007AFF',
        color: `${theme.colors.terciary}`,
        disableColor: '#007AFF',
        borderRadius: 24,
        borderWidth: 0,
        borderColor: '#007AFF',
        action: 'todos',
        disableButton: `${theme.colors.terciary}`
    },
    {
        id: 2,
        texto: 'Emergencia',
        icon: 'medkit' as const,
        bg: `${theme.colors.primary}`,
        color: `${theme.colors.terciary}`,
        disableColor: `${theme.colors.primary}`,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: `${theme.colors.primary}`,
        action: 'emergencia',
        disableButton: `${theme.colors.primary}`
    },
    {
        id: 3,
        texto: 'Alto Estoque',
        icon: 'arrow-up' as const,
        bg: 'green',
        color: `${theme.colors.terciary}`,
        disableColor: 'green',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'green',
        action: 'alto_estoque',
        disableButton: `${theme.colors.terciary}`
    },
];