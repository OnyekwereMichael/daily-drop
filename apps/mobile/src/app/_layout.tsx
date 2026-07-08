import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';

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
      <Stack screenOptions={{ headerShown: false }} />
      <AnimatedSplashOverlay />
    </QueryClientProvider>
  );
}
