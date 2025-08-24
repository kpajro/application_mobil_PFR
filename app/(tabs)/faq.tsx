import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
const extra = Constants.expoConfig?.extra || {};
const API_BASE_URL = extra.API_BASE_URL;

export default function FAQScreen() {
  const [faqdata, setFaqdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const faqdataf = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs`, {
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Connexion échouée.');
      }

      const data = await response.json()
      setFaqdata(data.member)
      setLoading(false)

    } catch (error) {
      setLoading(false);
      Alert.alert('Erreur', error.message)
    } finally {
      setRefreshing(false)
    }
  };

  useEffect(() => {
    faqdataf();
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    faqdataf();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    
    <ScrollView contentContainerStyle={styles.container}
    refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
    >
      <Text style={styles.title}>Foire Aux Questions (FAQ)</Text>
      <Text style={styles.question}>Q : Comment créer un compte ?</Text>
      <Text style={styles.answer}>R : Depuis la page d’accueil, cliquez sur "S’enregistrer" et remplissez le formulaire.</Text>

      <Text style={styles.question}>Q : Que faire en cas de problème de connexion ?</Text>
      <Text style={styles.answer}>R : Vérifiez votre email et mot de passe, ou cliquez sur "Mot de passe oublié".</Text>

      <Text style={styles.question}>Q : Puis-je utiliser les services sans créer de compte ?</Text>
      <Text style={styles.answer}>R : Non, un compte est nécessaire pour accéder aux fonctionnalités.</Text>

      {faqdata && (
        <View style={{ marginTop: 20 }}>
          <Text>{faqdata[0].questions}</Text>
          <Text>{faqdata[0].reponses}</Text>
        </View>
      )}
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
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  answer: {
    fontSize: 16,
    marginTop: 4,
    lineHeight: 22,
  },
});
