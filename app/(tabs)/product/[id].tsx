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
  Button,
  TouchableOpacity
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from '@/utils/apiFetch';
const extra = Constants.expoConfig?.extra || {};
const API_BASE_URL = extra.API_BASE_URL;

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();

  const fetchProduct = async () => {
    const token = await AsyncStorage.getItem('token')
    try {
      const res = await fetch(`${API_BASE_URL}/api/produits/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const addProductToPanier = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(id)
    const res = await apiFetch(`/api/add-produit/${id}`,
      { method: "POST"},
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}
    )
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProduct();
    console.log(product)
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
      <View style={styles.row}>
        <Text style={styles.title}>{product.nom}</Text>
        <TouchableOpacity style={styles.button} onPress={addProductToPanier}>
          <Text style={styles.buttonText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>

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
  row: {
    flexDirection: 'row',
    alignItems: 'center'
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
  button: {
    width: 128,
    height: 32,
    marginLeft: 12,
    alignSelf: "flex-start",
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
