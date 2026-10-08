import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormikProps } from 'formik';
import { TouchableOpacity, Text } from 'react-native';
import CustomInput from '@/components/CustomInput';

export interface SignupValues {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    role: 'USER' | 'STOREOWNER' | 'DRIVER';
}

interface SignupFormProps {
    formik: FormikProps<SignupValues>;
}

export default function SignupForm({ formik }: SignupFormProps) {
    const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formik;

    return (
        <View>
            <View style={styles.nameRow}>
                <View style={styles.nameField}>
                    <CustomInput
                        label="First Name"
                        placeholder="Wade"
                        autoCorrect={false}
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        error={touched.firstName ? errors.firstName : undefined}
                    />
                </View>
                <View style={styles.nameField}>
                    <CustomInput
                        label="Last Name"
                        placeholder="Warren"
                        autoCorrect={false}
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        error={touched.lastName ? errors.lastName : undefined}
                    />
                </View>
            </View>

            <CustomInput
                label="Email"
                placeholder="wadewarren@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email ? errors.email : undefined}
            />

            <CustomInput
                label="Phone Number"
                placeholder="+1 234 567 8900"
                keyboardType="phone-pad"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                error={touched.phoneNumber ? errors.phoneNumber : undefined}
            />

            <CustomInput
                label="Password"
                placeholder="Create a password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password ? errors.password : undefined}
            />

            <CustomInput
                label="Confirm Password"
                placeholder="Re-enter your password"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />

            <View style={styles.roleContainer}>
                <Text style={styles.roleLabel}>I am a</Text>
                <View style={styles.roleRow}>
                    {(['USER', 'STOREOWNER', 'DRIVER'] as const).map((role) => (
                        <TouchableOpacity
                            key={role}
                            style={[styles.roleOption, values.role === role && styles.roleOptionActive]}
                            onPress={() => setFieldValue('role', role)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.roleText, values.role === role && styles.roleTextActive]}>
                                {role === 'STOREOWNER' ? 'Store Owner' : role.charAt(0).toUpperCase() + role.toLowerCase().slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {touched.role && errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nameRow: {
        flexDirection: 'row',
        gap: 12,
    },
    nameField: {
        flex: 1,
    },
    roleContainer: {
        marginTop: 4,
        marginBottom: 16,
    },
    roleLabel: {
        color: '#4B5563',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
        fontFamily: 'ClashDisplay-Medium',
        paddingLeft: 2,
    },
    roleRow: {
        flexDirection: 'row',
        gap: 8,
    },
    roleOption: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    roleOptionActive: {
        borderColor: '#4F46E5',
        backgroundColor: '#EEF2FF',
    },
    roleText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6B7280',
        fontFamily: 'ClashDisplay-Medium',
    },
    roleTextActive: {
        color: '#4F46E5',
        fontWeight: '600',
    },
    errorText: {
        color: '#E53935',
        fontSize: 12,
        fontFamily: 'ClashDisplay-Regular',
        marginTop: 6,
        paddingLeft: 2,
    },
});
