import React from 'react';
import { View } from 'react-native';
import { FormikProps } from 'formik';
import CustomInput from '@/components/CustomInput';

export interface LoginValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  formik: FormikProps<LoginValues>;
}

export default function LoginForm({ formik }: LoginFormProps) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <View>
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
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        error={touched.password ? errors.password : undefined}
      />
    </View>
  );
}
