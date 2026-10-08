import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, router } from 'expo-router';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import Toast from 'react-native-toast-message';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { UserRole } from '@daily-drop/types'; // adjust to wherever UserRole actually lives

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../public/assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter-Medium': require('../public/assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter-SemiBold': require('../public/assets/fonts/Inter_18pt-SemiBold.ttf'),
    'Inter-Bold': require('../public/assets/fonts/Inter_18pt-Bold.ttf'),
    'Inter-ExtraBold': require('../public/assets/fonts/Inter_18pt-ExtraBold.ttf'),
    'ClashDisplay-Regular': require('../public/assets/fonts/ClashDisplay-Regular.otf'),
    'ClashDisplay-Medium': require('../public/assets/fonts/ClashDisplay-Medium.otf'),
    'ClashDisplay-Semibold': require('../public/assets/fonts/ClashDisplay-Semibold.otf'),
    'ClashDisplay-Bold': require('../public/assets/fonts/ClashDisplay-Bold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
        <AnimatedSplashOverlay />
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
}

// Split out so useAuth() runs *inside* AuthProvider, not above it.
function RootNavigator() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      switch (user.role) {
        case UserRole.USER:
          router.replace('/(customer)');
          break;
        case UserRole.DRIVER:
          router.replace('/(driver)');
          break;
        case UserRole.STOREOWNER:
          router.replace('/(owner)');
          break;
      }
    }
  }, [user, isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" />
        <Stack.Screen name="authLayout" />
      </Stack.Protected>

      <Stack.Protected guard={!!user && user.role === UserRole.USER}>
        <Stack.Screen name="(customer)" />
      </Stack.Protected>
      <Stack.Protected guard={!!user && user.role === UserRole.DRIVER}>
        <Stack.Screen name="(driver)" />
      </Stack.Protected>
      <Stack.Protected guard={!!user && user.role === UserRole.STOREOWNER}>
        <Stack.Screen name="(owner)" />
      </Stack.Protected>
    </Stack>
  );
}
