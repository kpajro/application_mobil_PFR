
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Navbar from '@/components/Navbar';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Adresse e-mail invalide.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      const response = await fetch('http://192.168.1.52:8080/api/login_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Connexion échouée.');
      }

      const data = await response.json();
      await AsyncStorage.setItem('token', data.token);
      Alert.alert('Succès', 'Connexion réussie !');
      router.replace('/(tabs)/profile');
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mot de passe"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text
          style={{ color: '#2563eb', textDecorationLine: 'underline' }}
          onPress={() => router.push('/(tabs)/forgot-password')}
        >
        Mot de passe oublié ?
        </Text>
      </View>


      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text>
          Pas encore de compte ?{' '}
          <Text
            style={{ color: '#2563eb', textDecorationLine: 'underline' }}
            onPress={() => router.push('/(tabs)/register')}
          >
            S'enregistrer
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 12, marginBottom: 16 },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
