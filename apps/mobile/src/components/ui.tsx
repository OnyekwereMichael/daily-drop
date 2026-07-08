import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
  type TouchableOpacityProps,
  type ViewProps,
  type TextInputProps,
} from 'react-native';
import { Colors, BorderRadius, Shadows, Fonts } from '@/constants/theme';

/* -------------------------------------------------------------------------- */
/*                                  Button                                    */
/* -------------------------------------------------------------------------- */

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ title, variant = 'primary', style, ...rest }: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        isPrimary && styles.buttonPrimary,
        isOutline && styles.buttonOutline,
        style,
      ]}
      activeOpacity={0.85}
      {...rest}
    >
      <Text
        style={[
          styles.buttonText,
          isPrimary && styles.buttonTextPrimary,
          isOutline && styles.buttonTextOutline,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Card                                     */
/* -------------------------------------------------------------------------- */

export function Card({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Input                                     */
/* -------------------------------------------------------------------------- */

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={Colors.textSecondary}
        onFocus={(e) => {
          setIsFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          rest.onBlur?.(e);
        }}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Styles                                    */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  // Button Styles
  buttonBase: {
    height: 52,
    borderRadius: BorderRadius.button,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    ...Shadows.default,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.default.sans,
    fontWeight: '600', // Assuming medium/semibold font weight mapping
  },
  buttonTextPrimary: {
    color: Colors.surface, // White text
  },
  buttonTextOutline: {
    color: Colors.textPrimary,
  },

  // Card Styles
  card: {
    backgroundColor: Colors.surface, // White background
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: Colors.border, // Light border
    padding: 16,
    ...Shadows.default, // Soft shadow
  },

  // Input Styles
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontFamily: Fonts.default.sans,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: Colors.surface, // White background
    borderWidth: 1,
    borderColor: Colors.border, // Gray border
    borderRadius: BorderRadius.input,
    paddingHorizontal: 16,
    color: Colors.textPrimary,
    fontSize: 15,
    fontFamily: Fonts.default.sans,
  },
  inputFocused: {
    borderColor: Colors.primary, // Indigo border on focus
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    fontFamily: Fonts.default.sans,
    marginTop: 6,
  },
});
