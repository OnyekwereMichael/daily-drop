import React from 'react';
import { View } from 'react-native';
import CustomInput from '@/components/CustomInput';

export default function LoginScreen() {
  return (
    <View>
      <CustomInput
        label="Email"
        placeholder="wadewarren@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
      />
    </View>
  );
}