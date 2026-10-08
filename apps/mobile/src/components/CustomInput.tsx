import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
    label: string;
    secureTextEntry?: boolean;
    error?: string;
}

export default function CustomInput({ label, secureTextEntry, error, style, onFocus, onBlur, ...props }: CustomInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const hasError = !!error;

    useEffect(() => {
        if (hasError) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 8, duration: 45, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -8, duration: 45, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 6, duration: 45, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -6, duration: 45, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 45, useNativeDriver: true }),
            ]).start();
        }
        // Re-shake whenever the error message changes (e.g. re-submitting with a new invalid value)
    }, [error]);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, isFocused && styles.labelFocused, hasError && styles.labelError]}>
                {label}
            </Text>

            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                <View style={[
                    styles.inputContainer,
                    isFocused && styles.inputFocused,
                    hasError && styles.inputError,
                ]}>
                    <TextInput
                        style={[styles.input, style]}
                        secureTextEntry={secureTextEntry && !isPasswordVisible}
                        onFocus={(e) => {
                            setIsFocused(true);
                            if (onFocus) onFocus(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            if (onBlur) onBlur(e);
                        }}
                        placeholderTextColor="#9CA3AF" // Softer gray placeholder for better text hierarchy
                        {...props}
                    />

                    {/* Vector Icon Toggle for Passwords */}
                    {secureTextEntry && (
                        <TouchableOpacity
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            style={styles.toggleButton}
                            activeOpacity={0.6}
                        >
                            <Feather
                                name={isPasswordVisible ? "eye" : "eye-off"}
                                size={16}
                                color={hasError ? '#E53935' : isFocused ? '#4F46E5' : '#6B7280'}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>

            {hasError && (
                <View style={styles.errorRow}>
                    <Feather name="alert-circle" size={13} color="#E53935" />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 18,
        width: '100%',
    },
    label: {
        color: '#4B5563', // Slightly softer primary gray for standard state
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
        fontFamily: 'ClashDisplay-Medium',
        paddingLeft: 2,
    },
    labelFocused: {
        color: '#4F46E5', // Dynamic accent shift on active interaction
    },
    labelError: {
        color: '#E53935',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderWidth: 1, // Standardized stroke weight for consistency
        borderColor: '#E5E7EB',
        borderRadius: 14,
        paddingHorizontal: 10,
        // Added smooth, subtle ambient depth
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.01,
        shadowRadius: 1,
        // elevation: 1,
    },
    inputFocused: {
        borderColor: '#4F46E5',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    inputError: {
        borderColor: '#E53935',
        shadowColor: '#E53935',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '500', // Balanced layout readability text weight
        fontFamily: 'ClashDisplay-Medium',
    },
    toggleButton: {
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 12,
    },
    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        paddingLeft: 2,
        gap: 5,
    },
    errorText: {
        color: '#E53935',
        fontSize: 12,
        fontFamily: 'ClashDisplay-Regular',
    },
});
