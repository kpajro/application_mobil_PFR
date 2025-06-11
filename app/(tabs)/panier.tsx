import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export default function PanierScreen() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://172.26.69.134:8080/api/panier') // à adapter
      .then(res => res.json())
      .then(data => {
        setProduits(data.produits || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement du panier :', err);
        setLoading(false);
        Alert.alert('Erreur', 'Impossible de charger le panier.');
      });
  }, []);

  const total = produits.reduce((acc, p) => acc + (p.prix || 0), 0);

  const handleValidate = () => {
    Alert.alert('Succès', 'Commande validée ! (simulé)');
    // TODO: envoyer la commande à l’API ou rediriger
  };

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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>{item.nom}</Text>
                <Text style={styles.price}>{item.prix} €</Text>
              </View>
            )}
          />
          <Text style={styles.total}>Total : {total.toFixed(2)} €</Text>
          <TouchableOpacity style={styles.button} onPress={handleValidate}>
            <Text style={styles.buttonText}>Valider la commande</Text>
          </TouchableOpacity>
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
