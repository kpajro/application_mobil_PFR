import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import Constants from 'expo-constants';
const extra = Constants.expoConfig?.extra || {};
const API_BASE_URL = extra.API_BASE_URL;

export default function SupportScreen() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showMessage = (type: 'success' | 'error', text: string) => {
    if (type === 'success') {
      setSuccess(text);
      setError('');
    } else {
      setError(text);
      setSuccess('');
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() =>
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 3000)
    );
  };

  const handleSubmit = async () => {
    if (!firstname || !lastname || !email || !subject || !message) {
      showMessage('error', 'Tous les champs sont requis.');
      return;
    }

    if (!validateEmail(email)) {
      showMessage('error', 'Adresse email invalide.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, subject, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue.');
      }

      showMessage('success', 'Message envoyé avec succès !');

      setFirstname('');
      setLastname('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      showMessage('error', err.message || 'Erreur réseau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contacter le support</Text>

      {success !== '' && (
        <Animated.View style={[styles.banner, styles.success, { opacity: fadeAnim }]}>
          <Text style={styles.bannerText}>{success}</Text>
        </Animated.View>
      )}
      {error !== '' && (
        <Animated.View style={[styles.banner, styles.error, { opacity: fadeAnim }]}>
          <Text style={styles.bannerText}>{error}</Text>
        </Animated.View>
      )}

      <TextInput placeholder="Prénom" value={firstname} onChangeText={setFirstname} style={styles.input} />
      <TextInput placeholder="Nom" value={lastname} onChangeText={setLastname} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Sujet" value={subject} onChangeText={setSubject} style={styles.input} />
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Envoi...' : 'Envoyer'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  banner: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  success: {
    backgroundColor: '#d1fae5',
  },
  error: {
    backgroundColor: '#fee2e2',
  },
  bannerText: {
    color: '#111827',
    fontWeight: '500',
    textAlign: 'center',
  },
});
