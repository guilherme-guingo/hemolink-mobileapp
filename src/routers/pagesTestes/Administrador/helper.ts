export const filtrosHospital = [
    {
        id: 1,
        texto: 'Tudo',
        icon: undefined,
        bg: '#007AFF',
        color: 'white',
        disableColor: '#007AFF',
        borderRadius: 24,
        borderWidth: 0,
        borderColor: '#007AFF',
        action: 'todos',
        disableButton: 'white'
    },
    {
        id: 2,
        texto: 'Emergencia',
        icon: 'medkit',
        bg: 'red',
        color: 'white',
        disableColor: 'red',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: 'red',
        action: 'emergencia',
        disableButton: 'red'
    },
    {
        id: 3,
        texto: 'Alto Estoque',
        icon: 'arrow-up',
        bg: 'green',
        color: 'white',
        disableColor: 'green',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'green',
        action: 'alto_estoque',
        disableButton: 'white'
    },
];