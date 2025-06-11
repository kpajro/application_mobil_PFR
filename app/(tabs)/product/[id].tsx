import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://172.26.69.134:8080/api/produits/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produit introuvable.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{product.nom}</Text>

      {product.image && (
        <Image source={{ uri: product.image }} style={styles.image} />
      )}

      <Text style={styles.detail}>Prix : {product.prix} €</Text>
      <Text style={styles.detail}>Édité par : {product.editeur?.nom || 'Inconnu'}</Text>
      <Text style={styles.detail}>Note : {product.note || 'Non évalué'}</Text>
      <Text style={styles.detail}>Catégorie : {product.categorie?.nom || 'Non spécifiée'}</Text>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.detail}>{product.description || 'Aucune description.'}</Text>

      <Text style={styles.sectionTitle}>Description détaillée</Text>
      <Text style={styles.detail}>{product.descriptionDetaillee || 'Aucune description détaillée.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
});
