import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = '@hemolink:favoritos'

export const lerFavoritos = async (): Promise<number[]> => {
    try {
        const dados = await AsyncStorage.getItem(CHAVE);
        return dados ? JSON.parse(dados) : [];
    } catch (e) {
        console.log('Erro ao ler favoritos:', e);
        return [];
    }
};

export const salvarFavoritos = async (favoritos: number[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(CHAVE, JSON.stringify(favoritos));
    } catch (e) {
        console.log('Erro ao salvar favoritos:', e);
    }
};