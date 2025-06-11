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

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://172.26.69.134:8080/api/categories');
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
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Text style={styles.title}>{item.nom}</Text>
          <Text>Nombre de produits: {item.nbProduits}</Text>
          <Text>Produits:</Text>
          {item.produits && item.produits.map(produit => (
            <Text key={produit.id}> {produit.nom}</Text>
          ))}
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
