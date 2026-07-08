import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
    label: string;
    secureTextEntry?: boolean;
}

export default function CustomInput({ label, secureTextEntry, style, onFocus, onBlur, ...props }: CustomInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, isFocused && styles.labelFocused]}>{label}</Text>

            <View style={[
                styles.inputContainer,
                isFocused && styles.inputFocused
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
                            color={isFocused ? '#4F46E5' : '#6B7280'}
                        />
                    </TouchableOpacity>
                )}
            </View>
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
    input: {
        flex: 1,
        height: '100%',
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '500', // Balanced layout readability text weight
        fontFamily: 'Inter',
    },
    toggleButton: {
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 12,
    },
});