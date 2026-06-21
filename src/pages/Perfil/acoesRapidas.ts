import { Ionicons } from "@expo/vector-icons";

type AcaoRapida = {
    id: string;
    titulo: string;
    icone: keyof typeof Ionicons.glyphMap;
};

export const acoesRapidas: AcaoRapida[] = [
    { id: '1', titulo: 'Meus Favoritos', icone: 'heart-outline' },
    { id: '2', titulo: 'Hospital Mais Próximo', icone: 'location-outline' },
    { id: '3', titulo: 'Dicas de Saúde', icone: 'fitness-outline' },
];