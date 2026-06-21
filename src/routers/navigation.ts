export type ParametrosRotasAuth = {
  Login: undefined;
  Cadastro: undefined;
};

export type ParametrosRotasApp = {
  AppHome: undefined;
  DetalheHospital: { id: string };
  CadastroHospital: undefined;
};

export type ParametrosRotasTabs = {
  TabsHome: undefined;
  TabsPerfil: undefined;
  TabsTeste: undefined;
  TabsAdministrador: undefined;
};

export type ParametrosRotasDrawer = {
  DrawerHome: undefined;
  DrawerPerfil: undefined;
  DrawerTeste: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParametrosRotasDrawer, ParametrosRotasTabs, ParametrosRotasAuth, ParametrosRotasApp {}
  }
}