import { useEffect } from "react";
import { pedirPermissaoNotificacao } from "../services/notifications";


type FuncaoNotificacao = (segundos: number) => Promise<void>;

export function useNotifications(segundos:number, notificacao: FuncaoNotificacao) {
  useEffect(() => {
    async function configurar() {
      const permitido = await pedirPermissaoNotificacao();

      if (permitido) {
        await notificacao(segundos);
      }
    }

    configurar();
  }, [segundos, notificacao]);
}
