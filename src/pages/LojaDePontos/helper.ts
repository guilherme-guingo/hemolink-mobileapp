import americanas from '../../assets/imagens/americanas.webp'
import apple from '../../assets/imagens/apple.webp'
import cea from '../../assets/imagens/CeA.webp'
import googlePlay from '../../assets/imagens/googleplay.webp'
import marisa from '../../assets/imagens/marisa.webp'
import netflix from '../../assets/imagens/netflix.webp'
import nintendo from '../../assets/imagens/nintendo.webp'
import playsatation from '../../assets/imagens/playsatation.webp'
import playstationStore from '../../assets/imagens/playstationStore.webp'
import riachuelo from '../../assets/imagens/riachuelo.webp'
import samsung from '../../assets/imagens/sansung.webp'
import uber from '../../assets/imagens/uber.webp'
import xbox from '../../assets/imagens/xbox.webp'


export const categorias =
    [
        {
            "id": "1",
            "label": "Todos",
            "icon": "grid-outline",
            "corIcone": "#007AFF",
        },
        {
            "id": "2",
            "label": "Gift-Cards",
            "icon": "gift-outline",
            "corIcone": "#4CD964"
        },
        {
            "id": "3",
            "label": "Roupas",
            "icon": "shirt-outline",
            "corIcone": "#FF3B30"
        },
        {
            "id": "4",
            "label": "Eletronicos",
            "icon": "headset-outline",
            "corIcone": "#FF9500"
        },
        {
            "id": "5",
            "label": "games",
            "icon": "game-controller-outline",
            "corIcone": "#5856D6"
        },
        {
            "id": "6",
            "label": "Varejo",
            "icon": "tv-outline",
            "corIcone": "#5856D6"
        },
    ] as const

export const giftCards = [
    {
        id: "1",
        nome: "Americanas",
        imagem: americanas,
        pontos: "2.500 Pontos",
        description: "15% OFF",
        tipo: "varejo"
    },
    {
        id: "2",
        nome: "Apple",
        imagem: apple,
        pontos: "3.000 Pontos",
        description: "10% OFF",
        tipo: "eletronicos"
    },
    {
        id: "3",
        nome: "C&A",
        imagem: cea,
        pontos: "2.000 Pontos",
        description: "30% OFF",
        tipo: "roupas"
    },
    {
        id: "4",
        nome: "Google Play",
        imagem: googlePlay,
        pontos: "2.500 Pontos",
        description: "R$20 Reais",
        tipo: "gift-Cards"
    },
    {
        id: "5",
        nome: "Marisa",
        imagem: marisa,
        pontos: "2.000 Pontos",
        description: "30% OFF",
        tipo: "roupas"
    },
    {
        id: "6",
        nome: "Netflix",
        imagem: netflix,
        pontos: "3.500 Pontos",
        description: "1 Mês de assinatura",
        tipo: "gift-Cards"
    },
    {
        id: "7",
        nome: "Nintendo",
        imagem: nintendo,
        pontos: "4.000 Pontos",
        description: "R$ 50,00",
        tipo: "games"
    },
    {
        id: "9",
        nome: "Riachuelo",
        imagem: riachuelo,
        pontos: "2.000 Pontos",
        description: "20% OFF",
        tipo: "roupas"
    },
    {
        id: "10",
        nome: "PlayStation Store",
        imagem: playstationStore,
        description: "R$ 150,00",
        pontos: "4.500 Pontos",
        tipo: "games"
    },
    {
        id: "11",
        nome: "Samsung",
        imagem: samsung,
        pontos: "3.000 Pontos",
        description: "12% OFF",
        tipo: "eletronicos"
    },
    {
        id: "12",
        nome: "Uber",
        imagem: uber,
        pontos: "2.500 Pontos",
        description: "R$20,00",
        tipo: "gift-Cards"
    },
    {
        id: "13",
        nome: "Xbox",
        imagem: xbox,
        pontos: "4.000 Pontos",
        description: "30% OFF",
        tipo: "games"
    },
];