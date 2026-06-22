import { Ionicons } from "@expo/vector-icons";

type AcaoRapida = {
  id: string;
  titulo: string;
  icone: keyof typeof Ionicons.glyphMap;
 textoPrincipal: string; 
  textoDestaque: string;  
  rodape?: string;
};

export const acoesRapidas: AcaoRapida[] = [
  { 
    id: "1", 
    titulo: "Impacto do ato", 
    icone: "heart-outline", 
    textoPrincipal: "Uma doação pode ajudar até",
    textoDestaque: "4 pessoas",
    rodape: "Doar sangue é um ato que salva vidas"
  },
  { 
    id: "2", 
    titulo: "Processo Seguro",
    icone: "shield-checkmark-outline",
    textoPrincipal: "Todo o material utilizado é",
    textoDestaque: "100% descartável",
    rodape: "Segurança total em cada etapa"
  },
  { 
    id: "3", 
   titulo: "Tempo de Repouso", 
    icone: "time-outline", 
    textoPrincipal: "O procedimento todo leva apenas",
    textoDestaque: "40 minutos",
    rodape: "Um pequeno tempo que gera vida"
  },
];