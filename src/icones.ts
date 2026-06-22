// Nota: caso queiram pesquisar mais icones, adicionem aqui. Link da pagina dos icones caso queiram mais: https://ionic.io/ionicons

// Obs: como usar:
// 1- Import na pagina desejada;
// 2- Import do arquivo de icones global na pagina desejada;
// 3- Chame o <Icon />
//
//  Ex:
//  import { ICONS } from "../../../icones";
//  import Icon from "@expo/vector-icons/Ionicons";
//  <Icon name={ICONS.settings} size={24} />

export const ICONS = {
  home: "home-outline",
  profile: "person-outline",
  settings: "settings-outline",
  search: "search-outline",
  notifications: "notifications-outline",
  favorite: "heart-outline",
  chat: "chatbubble-outline",
  help: "help-circle-outline",
  logout: "log-out-outline",
  albumns: "albums-outline",
  add: "add-outline",
  document: "document-text-outline",
  openeye: "eye-outline",
  closeeye: "eye-off-outline",
  camera: "camera-outline",
  filter: "filter-outline",
  list: "list-outline",
  hamburguer: "reorder-three-outline",
  chechmark: "checkmark-outline",
  close: "close-outline",
  alert: "alert-outline",
  gift:"gift-outline",
  grid:"grid-outline",
  shirt:"shirt-outline",
  headset:"headset-outline"
} as const;
