import React from 'react';
import { Platform, KeyboardAvoidingView, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Button } from '../Button';
import { styles } from './styles';
import { theme } from '../../theme';

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.form}>
          {children}

          {isLoading ? (
            <ActivityIndicator
              color={theme.colors.primary}
              size="small"
              style={styles.loadingContainer}
            />
          ) : (
            <Button
              texto={buttonText}
              onPress={onSubmit}
            />
          )}
          {footer}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
