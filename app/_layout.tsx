import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Slot, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { PanierProvider } from '../context/PanierContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';
import React from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter();

  const [isLoggedIn] = useState(true);
  const [isAdmin] = useState(false);
  const [panierCount] = useState(0); // à remplacer par panier.length + usePanier plus tard

  if (!loaded) {
    return null;
  }

  return (
    <PanierProvider> {/* Provide the panier context to the entire app */ }
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Navbar
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            panierCount={panierCount}
            onNavigate={(route) => router.push(`/${route.toLowerCase()}`)}
          />
          <View style={{ flex: 1 }}>
            <Slot />
          </View>
          <Footer />
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'light'} />
        </View>
      </ThemeProvider>
    </PanierProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});
