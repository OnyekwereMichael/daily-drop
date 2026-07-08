import React, { useState } from 'react';
// 1. Added ScrollView to the imports below
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors, BorderRadius, Shadows } from '@/constants/theme';
import Svg, { Path, G } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import SignupScreen from './signup';
import LoginScreen from './login';
import CustomInput from '@/components/CustomInput';

const { width } = Dimensions.get('window');

export const GoogleIcon = () => (
    <Svg width="18" height="18" viewBox="0 0 24 24">
        <Path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.82z"
        />
        <Path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z"
        />
        <Path
            fill="#FBBC05"
            d="M5.32 14.24A7.16 7.16 0 0 1 4.93 12c0-.79.13-1.57.39-2.29V6.56H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"
        />
        <Path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 5.39l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"
        />
    </Svg>
);

export const FacebookIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24">
        <Path
            fill="#1877F2"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
    </Svg>
);

export default function AuthLayout() {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    return (
        <View style={styles.container}>
            {/* Top Banner Block Pattern */}
            <View style={styles.topHeaderBlock}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}><Feather name="arrow-left" size={24} color="white" /></Text>
                </TouchableOpacity>

                {/* Dynamic Header Titles Based on UI Pattern */}
                <Text style={styles.headerTitle}>
                    {activeTab === 'login' ? 'Go ahead and complete your account and setup' : 'Sign up now to access your personal account'}
                </Text>
            </View>

            {/* 2. Swapped View for ScrollView and added contentContainerStyle */}
            <ScrollView
                style={styles.formSurface}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'login' && styles.activeTabButton]}
                        onPress={() => setActiveTab('login')}
                    >
                        <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'signup' && styles.activeTabButton]}
                        onPress={() => setActiveTab('signup')}
                    >
                        <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Inputs Form */}
                <View style={styles.form}>
                    {activeTab === 'signup' ? (
                        <>
                            <SignupScreen />
                            <CustomInput
                                label="Confirm Password"
                                placeholder="Re-enter your password"
                                secureTextEntry
                            />
                        </>
                    ) : (
                        <>
                            <LoginScreen />
                            {/* Remember Me & Forgot Password Row */}
                            <View style={styles.utilitiesRow}>
                                <TouchableOpacity style={styles.checkboxRow}>
                                    <View style={styles.checkbox} />
                                    <Text style={styles.utilityText}>Remember Me</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={[styles.utilityText, styles.forgotText]}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    {/* Main Primary Action Button */}
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={styles.primaryButtonText}>
                            {activeTab === 'login' ? 'Login' : 'Register'}
                        </Text>
                    </TouchableOpacity>

                    {/* Alternative Multi-Auth Platform Options */}
                    {activeTab === 'login' && <>
                        <Text style={styles.dividerText}>Or login with</Text>
                    </> || activeTab === 'signup' && <>
                        <Text style={styles.dividerText}>Or register with</Text>
                    </>}

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialButton}>
                            <GoogleIcon />
                            <Text style={[styles.socialButtonText, { marginLeft: 8 }]}></Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <FacebookIcon />
                            <Text style={[styles.socialButtonText, { marginLeft: 8 }]}></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    topHeaderBlock: {
        backgroundColor: Colors.primary,
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        color: Colors.surface,
        fontSize: 20,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 24,
        color: Colors.surface,
        fontFamily: "ClashDisplay-Semibold",
        lineHeight: 32,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 13,
        color: Colors.border,
        lineHeight: 18,
        fontFamily: "Inter",
    },
    formSurface: {
        flex: 1,
        backgroundColor: Colors.background,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginTop: -24,
    },
    // 3. Added this to structure the padding inside the ScrollView correctly
    scrollContent: {
        paddingHorizontal: 22,
        paddingTop: 24,
        paddingBottom: 40, // Ensures extra breathing room at the bottom when scrolled
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.border,
        padding: 4,
        borderRadius: 16,
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeTabButton: {
        backgroundColor: Colors.surface,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 20,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        fontFamily: 'ClashDisplay-Medium',
    },
    activeTabText: {
        color: Colors.textPrimary,
    },
    illustrationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: width * 0.28,
        marginBottom: 12,
    },
    illustration: {
        width: '100%',
        height: '100%',
    },
    form: {
        width: '100%',
    },
    rowInputs: {
        flexDirection: 'row',
        gap: 12,
    },
    inputWrapper: {
        marginBottom: 14,
    },
    inputLabel: {
        color: Colors.textPrimary,
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
        fontFamily: 'Inter',
    },
    input: {
        height: 50,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.input,
        paddingHorizontal: 16,
        color: Colors.textPrimary,
        fontSize: 14,
        fontFamily: 'Inter',
    },
    utilitiesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1.5,
        borderColor: Colors.border,
        borderRadius: 4,
        backgroundColor: Colors.surface,
    },
    utilityText: {
        fontSize: 13,
        color: Colors.textSecondary,
        fontFamily: 'ClashDisplay-Regular',
    },
    forgotText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    primaryButton: {
        height: 52,
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.button,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 20,
        elevation: 2,
    },
    primaryButtonText: {
        color: Colors.surface,
        fontSize: 15,
        // fontWeight: '700',
        fontFamily: 'ClashDisplay-Medium',
    },
    dividerText: {
        color: Colors.textSecondary,
        textAlign: 'center',
        marginVertical: 18,
        fontSize: 12,
        fontFamily: 'ClashDisplay-Regular',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        height: 48,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.button,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialButtonText: {
        color: Colors.textPrimary,
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'ClashDisplay-Semibold',
    },
});