import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  dadosBox: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 20,
    overflow: 'hidden',
  },
  dadoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  dadoChave: {
    fontSize: 14,
    color: theme.colors.textBase,
  },
  dadoValor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#141D23',
  },
  tipoSanguineoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tipoSanguineoTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
