import styled from 'styled-components/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

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
  flex-direction: row;
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

export const GoogleButton = styled.TouchableOpacity.attrs(() => ({
  style: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1, 
  },
}))`
  background-color: #FFFFFF;
  border-width: 1px;
  border-color: #E2E8F0;
  border-radius: 8px;
  flex-direction: row;
  padding-top: 12px;
  padding-bottom: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const GoogleIcon = styled(FontAwesome5).attrs(() => ({
  name: 'google',
  size: 16,
  color: '#DB4437',
}))`
  margin-right: 10px;
`;

export const GoogleButtonText = styled.Text`
  color: #4A5568;
  font-weight: 600;
  font-size: 15px;
`;

