import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://localhost:8000/api/produits/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProduct();
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
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <Text style={styles.title}>{product.nom}</Text>

      {product.images?.length > 0 &&
        product.images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} resizeMode="contain" />
        ))}

      <Text style={styles.label}>Prix:</Text>
      <Text style={styles.value}>{product.prix} €</Text>

      <Text style={styles.label}>Catégorie:</Text>
      <Text style={styles.value}>{product.categorie?.nom}</Text>

      <Text style={styles.label}>Description courte:</Text>
      <Text style={styles.value}>{product.description || 'Aucune description'}</Text>

      <Text style={styles.label}>Description détaillée:</Text>
      {product.longDescription ? (
        <RenderHTML contentWidth={width} source={{ html: product.longDescription }} />
      ) : (
        <Text style={styles.value}>Aucune description détaillée</Text>
      )}

      <Text style={styles.label}>Éditeur:</Text>
      <Text style={styles.value}>{product.editeur}</Text>

      <Text style={styles.label}>Langages:</Text>
      <Text style={styles.value}>{product.langages?.join(', ') || 'Non renseigné'}</Text>

      <Text style={styles.label}>Systèmes d'exploitation:</Text>
      <Text style={styles.value}>{product.os?.join(', ') || 'Non renseigné'}</Text>

      <Text style={styles.label}>Stock:</Text>
      <Text style={styles.value}>
        {product.isLimitedStock ? `${product.stock} unités` : 'Stock illimité'}
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
    flexGrow: 1,
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
