import styled from 'styled-components/native';

interface ThemeProps {
  theme?: {
    colors?: {
      primary?: string;
      background?: string;
      textBase?: string;
    };
  };
}

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme?.colors?.background };
  padding: 0 24px;
  justify-content: center;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }: ThemeProps) => theme?.colors?.primary};
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }: ThemeProps) => theme?.colors?.textBase};
  text-align: center;
`;

export const Form = styled.View`
  width: 100%;
  gap: 4px;
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs(({ theme }: ThemeProps) => ({
  color: theme?.colors?.primary,
  size: 'small',
}))`
  margin-top: 14px;
  margin-bottom: 14px;
`;