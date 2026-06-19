import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

interface ThemeProps {
  theme?: {
    colors?: {
      primary?: string;
      background?: string;
      textBase?: string;
      status?: {
        danger?: string;
      };
    };
  };
}

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme?.colors?.background};
  padding: 0 24px;
  justify-content: center;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: ${({ theme }: ThemeProps) => theme?.colors?.status?.danger};
  margin-top: 4px;
  margin-bottom: 12px;
  padding-left: 4px;
`;

export const PasswordContainer = styled.View`
  width: 100%;
  position: relative;
  justify-content: center;
`;

export const ToggleButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 10;
  margin-top: -6px; 
`;

export const EyeIcon = styled(Ionicons).attrs(() => ({
  color: '#8E8E93', 
  size: 22,
}))``;

export const SignUpContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const SignUpText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: ThemeProps) => theme?.colors?.textBase};
`;

export const SignUpBoldText = styled.Text`
  font-weight: bold;
  color: ${({ theme }: ThemeProps) => theme?.colors?.primary};
`;