import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { lerFavoritos, salvarFavoritos } from "../util/favoritosStorage";

type FavoritosContextType = {
    favoritos: number[];
    alternarFavorito: (id: number) => void;
    ehFavorito: (id: number) => boolean;
};

const FavoritosContext = createContext<FavoritosContextType>({} as FavoritosContextType);

export const FavoritosProvider = ({ children }: { children: ReactNode }) => {
    const [favoritos, setFavoritos] = useState<number[]>([]);

    useEffect(() => {
        const carregar = async () => {
            const salvos = await lerFavoritos();
            setFavoritos(salvos);
        };
        carregar();
    }, []);

    const alternarFavorito = (id: number) => {
        setFavoritos((atuais) => {
            const novos = atuais.includes(id)
                ? atuais.filter((f) => f !== id)
                : [...atuais, id];
            salvarFavoritos(novos);
            return novos;
        });
    };

    const ehFavorito = (id: number) => favoritos.includes(id);

    return (
        <FavoritosContext.Provider value={{ favoritos, alternarFavorito, ehFavorito }}>
            {children}
        </FavoritosContext.Provider>
    );
};


export const useFavoritos = () => useContext(FavoritosContext);