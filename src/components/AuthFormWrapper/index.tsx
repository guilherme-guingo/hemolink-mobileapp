import React from 'react';
import { Platform } from 'react-native'; 
import { Button } from '../Button'; 
import {
  Container,
  ScrollContainer,
  Header,
  Title,
  Subtitle,
  Form,
  LoadingIndicator, 
} from './styles';

interface AuthFormWrapperProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onSubmit: () => void;
  isLoading: boolean;
  children: React.ReactNode; 
  footer?: React.ReactNode;
}

export function AuthFormWrapper({
  title,
  subtitle,
  buttonText,
  onSubmit,
  isLoading,
  children,
  footer, 
}: AuthFormWrapperProps) {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollContainer>
        <Header>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Header>

        <Form>
          {children}
        
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <Button
              texto={buttonText}
              onPress={onSubmit}
            />
          )}
          {footer}
        </Form>
      </ScrollContainer>
    </Container>
  );
}