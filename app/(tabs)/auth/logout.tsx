import React, { useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../_layout'

export default function Logout() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await AsyncStorage.removeItem('token');
        setIsLoggedIn(false);
        router.replace('/');
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
      }
    };

    doLogout();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Déconnexion...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 12, fontSize: 16 },
});