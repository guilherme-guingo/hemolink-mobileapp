import { theme } from "../../theme";

export const filtrosHospital = [
    {
        id: 1,
        texto: 'Tudo',
        icon: undefined,
        borderRadius: 24,
        borderWidth: 0,
        action: 'todos',
        disableButton: `${theme.colors.terciary}`
    },
    {
        id: 2,
        texto: 'Emergencia',
        icon: 'medkit' as const,
        borderRadius: 24,
        borderWidth: 2,
        action: 'emergencia',
        disableButton: `${theme.colors.primary}`
    },
    {
        id: 3,
        texto: 'Alto Estoque',
        icon: 'arrow-up' as const,
        borderRadius: 24,
        borderWidth: 1,
        action: 'alto_estoque',
        disableButton: `${theme.colors.terciary}`
    },
];

