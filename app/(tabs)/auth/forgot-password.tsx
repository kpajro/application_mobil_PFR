import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse email.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://172.26.69.134:8080/api/reset-password', { //A ajouter dans l app symfony
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Une erreur est survenue.');
      }

      Alert.alert('Succès', 'Un email de réinitialisation a été envoyé.');
      router.replace('/login');
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mot de passe oublié</Text>
      <Text style={styles.instructions}>
        Entrez votre adresse email pour recevoir un lien de réinitialisation.
      </Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Envoi...' : 'Envoyer'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  instructions: { textAlign: 'center', marginBottom: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    padding: 12, marginBottom: 16
  },
  button: {
    backgroundColor: '#2563eb', padding: 14, borderRadius: 6, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
