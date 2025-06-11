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
      
      {product.images?.length > 0 && product.images.map((img, index) => (
        <Image key={index} source={{ uri: img }} style={styles.image} resizeMode="contain" />
      ))}

      <Text style={styles.label}>Prix:</Text>
      <Text style={styles.value}>{product.prix} €</Text>

      <Text style={styles.label}>Catégorie:</Text>
      <Text style={styles.value}>{product.categorie?.nom}</Text>

      <Text style={styles.label}>Description courte:</Text>
      <Text style={styles.value}>{product.description || 'Aucune description'}</Text>

      <Text style={styles.label}>Description détaillée:</Text>
      <Text style={styles.value}>{product.longDescription || 'Non fournie'}</Text>

      <Text style={styles.label}>Éditeur:</Text>
      <Text style={styles.value}>{product.editeur}</Text>

      <Text style={styles.label}>Langages:</Text>
      <Text style={styles.value}>{product.langages?.join(', ') || 'Non renseigné'}</Text>

      <Text style={styles.label}>Systèmes d'exploitation:</Text>
      <Text style={styles.value}>{product.os?.join(', ') || 'Non renseigné'}</Text>

      <Text style={styles.label}>Stock:</Text>
      <Text style={styles.value}>
        {product.isLimitedStock ? product.stock + ' unités' : 'Stock illimité'}
      </Text>

      <Text style={styles.label}>Vente en lot:</Text>
      <Text style={styles.value}>
        {product.isBulkSale ? `Oui (taille du lot: ${product.bulkSize})` : 'Non'}
      </Text>

      <Text style={styles.label}>Note:</Text>
      <Text style={styles.value}>{product.note ?? 'Pas encore noté'}</Text>
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
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
});