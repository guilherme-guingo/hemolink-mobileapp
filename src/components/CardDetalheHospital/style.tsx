import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
  },
  imagem: {
    width: '100%',
    height: 200,
  },
  conteudo: {
    padding: 20,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: 10,
  },
  linhaIcone: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  texto: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  tituloEstoque: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginTop: 20,
    marginBottom: 10,
  },
  gridSangue: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  boxSangue: {
    width: '22%',
    backgroundColor: '#F6FAFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5BDBB',
  },
  tipoSangue: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  porcentagemSangue: {
    fontSize: 12,
    color: '#666',
  }
});