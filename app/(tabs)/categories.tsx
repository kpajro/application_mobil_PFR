import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
const extra = Constants.expoConfig?.extra || {};
const API_BASE_URL = extra.API_BASE_URL;

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchCategories = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'AppMobile/1.0',
          'ngrok-skip-browser-warning': 'true'
        },
      });
      const data = await res.json();
      setCategories(data['member'] || []);
    } catch (error) {
      console.error('Erreur lors du fetch des catégories:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({
            pathname: '/(tabs)/category-products',
            params: { id: item.id, nom: item.nom },
          })}
        >
          <Text style={styles.title}>{item.nom}</Text>
          <Text>Nombre de produits: {item.nbProduits}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
