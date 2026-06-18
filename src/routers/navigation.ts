export type ParametrosRotasStack = {
  StackLogin: undefined;
  StackHome: undefined;
};

export type ParametrosRotasTabs = {
  TabsHome: undefined;
  TabsPerfil: undefined;
  TabsTeste: undefined;
};

export type ParametrosRotasDrawer = {
  DrawerHome: undefined;
  DrawerPerfil: undefined;
  DrawerTeste: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParametrosRotasDrawer {}
    interface RootParamList extends ParametrosRotasStack {}
    interface RootParamList extends ParametrosRotasTabs {}
  }
}
