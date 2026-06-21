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

interface BloodChipProps {
  selected: boolean;
}

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

export const SignInContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const SignInText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: ThemeProps) => theme?.colors?.textBase};
`;

export const SignInBoldText = styled.Text`
  font-weight: bold;
  color: ${({ theme }: ThemeProps) => theme?.colors?.primary};
`;


export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }: ThemeProps) => theme?.colors?.textBase};
  margin-top: 12px;
  margin-bottom: 8px;
  padding-left: 4px;
`;

export const BloodGrid = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const BloodChip = styled.TouchableOpacity<BloodChipProps>`
  padding: 12px 0px;
  border-radius: 8px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  width: 22%; 
  margin-bottom: 10px;
  
  border-color: ${({ selected, theme }) => 
    selected ? (theme?.colors?.primary || '#DB4437') : '#D1D5DB'};
    
  background-color: ${({ selected, theme }) => 
    selected ? (theme?.colors?.primary || '#DB4437') : 'transparent'};
`;

export const BloodText = styled.Text<BloodChipProps>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ selected, theme }) => 
    selected ? '#FFFFFF' : (theme?.colors?.textBase)};
`;