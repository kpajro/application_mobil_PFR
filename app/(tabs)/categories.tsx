import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.1.52:8080/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data['member'] || []);
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.error('Erreur lors du fetch des catégories:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
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