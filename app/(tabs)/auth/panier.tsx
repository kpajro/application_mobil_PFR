import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Button, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { red } from 'react-native-reanimated/lib/typescript/Colors';
import { apiFetch } from '@/utils/apiFetch';
const extra = Constants.expoConfig?.extra || {};
const API_BASE_URL = extra.API_BASE_URL;

export default function PanierScreen() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPanier();
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPanier();
  }, []);

  const removeProductFromPanier = async (id: number) => {
    const token = await AsyncStorage.getItem('token')
    const res = await apiFetch(`/api/remove-produit/${id}`,
      { method: "POST"},
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}
    )
    fetchPanier();
  }

  const goToStripe = async () => {
  const url = "https://www.stripe.com";
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erreur", "Impossible d'ouvrir le lien.");
    }
  } catch (err) {
    console.error("Erreur ouverture URL:", err);
    Alert.alert("Erreur", "Une erreur est survenue.");
  }
};

  const fetchPanier = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/api/panier`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProduits(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement du panier :', err);
      Alert.alert('Erreur', 'Impossible de charger le panier.');
    } finally {
      setLoading(false);
      setRefreshing(false)
    }
  };

  const somme = produits.map((produit) => produit.amount * produit.produit.prix)
  const total = somme.reduce((acc, curr) => acc + curr , 0);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon panier</Text>

      {produits.length === 0 ? (
        <Text style={styles.empty}>Votre panier est vide.</Text>
      ) : (
        <>
          <FlatList
            data={produits}
            keyExtractor={(item) => item.produit.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>{item.produit.nom}</Text>
                <Text style={styles.price}>{item.produit.prix} € x {item.amount}</Text>
                <Button color="#ff0000ff" title='X' onPress={() => removeProductFromPanier(item.produit.id)}></Button>
              </View>
            )}
          />
          <Text style={styles.total}>Total : {total.toFixed(2)} €</Text>
          <Button title='Aller au paiement' onPress={goToStripe}></Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 40,
  },
});
