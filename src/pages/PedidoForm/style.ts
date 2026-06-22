import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textBase,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 8,
  },
  dataBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dataTexto: {
    fontSize: 14,
    color: '#141D23',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
  },
  modalTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#141D23',
    marginBottom: 16,
    textAlign: 'center',
  },
  tipoItem: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    alignItems: 'center',
  },
  tipoItemAtivo: {
    backgroundColor: theme.colors.primary,
  },
  tipoItemTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  tipoItemTextoAtivo: {
    color: '#fff',
  },
});
