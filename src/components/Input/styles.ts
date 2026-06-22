import { DimensionValue } from 'react-native';

type InputStyleProps = {
  color?: string;
  borderColor?: string;
  focusColor?: string;
  width?: string | number;
  hasError?: boolean;
  errorColor?: string;
  isFocused?: boolean;
  disabled?: boolean;
  paddingLeft?: number;
};

export const getInputStyles = ({
  color = '#334155',
  borderColor = '#94a3b8',
  focusColor = '#94a3b8',
  width = '100%',
  hasError = false,
  errorColor = '#dc3545',
  paddingLeft = 0,
  isFocused = false,
  disabled = false,
}: InputStyleProps) => {
  const activeBorderColor = hasError
    ? errorColor
    : isFocused
      ? focusColor
      : borderColor;

  return {
    container: {
      width: width as DimensionValue,
      marginBottom: 16,
    },
    wrapper: {
      flexDirection: 'row' as const,
      alignItems: 'center',
      width: '100%',
      borderWidth: 1,
      borderColor: activeBorderColor,
      borderRadius: 8,
      backgroundColor: disabled ? '#f1f5f9' : '#ffffff',
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: disabled ? '#94a3b8' : color,
      paddingHorizontal: 16,
      paddingVertical: 12,
      textAlignVertical: 'center' as const,
      paddingLeft: paddingLeft ?? 0,
    },
    iconLeft: {
      position: 'absolute',
      left: 8
    },
    label:{
      fontWeight:'600'
    },
    iconRight: {
      marginLeft: 12,
    },
    errorText: {
      marginTop: 4,
      fontSize: 12,
      color: errorColor,
    },
  } as const;
};
