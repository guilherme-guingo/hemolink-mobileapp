import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: '#C8102E',
    marginTop: 4,
    marginBottom: 12,
    paddingLeft: 4,
  },

  passwordContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },

  toggleButton: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginTop: -6,
  },

  eyeIcon: {
    color: '#8E8E93',
    fontSize: 22,
  },

  signInContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },

  signInText: {
    fontSize: 14,
    color: '#141D23',
  },

  signInBoldText: {
    fontWeight: '700',
    color: '#C8102E',
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#141D23',
    marginTop: 12,
    marginBottom: 8,
    paddingLeft: 4,
  },

  bloodGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  bloodChip: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '22%',
    marginBottom: 10,
  },

  bloodChipSelected: {
    borderColor: '#DB4437',
    backgroundColor: '#DB4437',
  },

  bloodChipUnselected: {
    borderColor: '#D1D5DB',
    backgroundColor: 'transparent',
  },

  bloodText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  bloodTextSelected: {
    color: '#FFFFFF',
  },

  bloodTextUnselected: {
    color: '#141D23',
  },
});
