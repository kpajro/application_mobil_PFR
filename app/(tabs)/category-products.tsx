import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function CategoryProductsScreen() {
  const { id, nom } = useLocalSearchParams<{ id: string; nom: string }>();
  const router = useRouter();
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://172.26.69.134:8080/api/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduits(data.produits || []);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produits de la catégorie "{nom}"</Text>
      <FlatList
        data={produits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/(tabs)/product/[id]',
                params: { id: item.id },
              })
            }
          >
            <View style={styles.card}>
              <Text style={styles.productName}>{item.nom}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
  },
});
