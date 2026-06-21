import * as WebBrowser from 'expo-web-browser';
import { registerRootComponent } from 'expo';
import App from './App';

if (typeof window !== 'undefined' && window.opener && (window.location.hash || window.location.search)) {
  WebBrowser.maybeCompleteAuthSession();
  try {
    window.opener.postMessage(window.location.href, window.location.origin);
    window.close();
  } catch (e) {
    console.error("Erro ao fechar pop-up do Google:", e);
  }
} else {

  WebBrowser.maybeCompleteAuthSession();
  registerRootComponent(App);
}