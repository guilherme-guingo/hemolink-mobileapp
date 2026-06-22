export type ParametrosRotasAuth = {
  Login: undefined;
  Cadastro: undefined;
};

export type ParametrosRotasApp = {
  AppHome: undefined;
  DetalheHospital: { id: string };
  CadastroHospital: { id?: string };
  VisualizarHospital: { id: string }
  PedidoForm: undefined;
};

export type ParametrosRotasTabs = {
  TabsHome: undefined;
  TabsPerfil: undefined;
  TabsCatalogo: undefined;
  TabsAdministrador: undefined;
};

export type ParametrosRotasDrawer = {
  DrawerHome: { screen: keyof ParametrosRotasTabs } | undefined;
  DrawerLojaDePontos: undefined;
};

export type ParametrosRotasTestes = {
  StackLogin: undefined;
  StackHome: undefined;
  StackCadastro: undefined;
  StackCadastroHospital: { id?: string };
  StackDetalheHospital: { id: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParametrosRotasDrawer, ParametrosRotasTabs, ParametrosRotasAuth, ParametrosRotasApp, ParametrosRotasTestes {}
  }
}