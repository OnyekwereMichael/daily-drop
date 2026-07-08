import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomInput from '@/components/CustomInput';

export default function SignupScreen() {
    return (
        <View>
            <View style={styles.nameRow}>
                <View style={styles.nameField}>
                    <CustomInput
                        label="First Name"
                        placeholder="Wade"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.nameField}>
                    <CustomInput
                        label="Last Name"
                        placeholder="Warren"
                        autoCorrect={false}
                    />
                </View>
            </View>
            <CustomInput
                label="Email"
                placeholder="wadewarren@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <CustomInput
                label="Password"
                placeholder="Create a password"
                secureTextEntry
            />
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
});