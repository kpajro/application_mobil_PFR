import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Slot, useRouter } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState, createContext } from 'react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-reanimated';
import React from 'react';

export const AuthContext = createContext({ isLoggedIn: false, setIsLoggedIn: (_: boolean) => {} });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isAdmin] = useState(false);
  const [panierCount] = useState(0);

  const checkConnected = async () =>{
    const token = await AsyncStorage.getItem('token');
    if(token){
      setIsLoggedIn(true)
    }
  }
  useEffect(()=>{
    checkConnected()
    console.log("check for token")
  }, [])

  if (!loaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
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
  </AuthContext.Provider>
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
