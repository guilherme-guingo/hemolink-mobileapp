export type ParametrosRotasStack = {
  StackLogin: undefined;
  StackHome: undefined;
};

export type ParametrosRotasTabs = {
  TabsHome: undefined;
  TabsPerfil: undefined;
  TabsTeste: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParametrosRotasStack {}
    interface RootParamList extends ParametrosRotasTabs {}
  }
}
