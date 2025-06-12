import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { usePanier } from '../../context/PanierContext';
import * as Linking from 'expo-linking';

export default function PanierScreen() {
  const { panier, supprimerDuPanier, viderPanier } = usePanier();

  const total = panier.reduce((sum, item) => sum + item.prix, 0);

  const handlePaiement = async () => {
    // ⚠️ Remplace cette URL par celle générée par ton backend plus tard
    const fakeUrl = 'https://stripe.com/fr'; // à remplacer par l'URL de ta session Stripe
    Linking.openURL(fakeUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Panier</Text>

      <FlatList
        data={panier}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nom}</Text>
            <Text style={styles.itemPrice}>{item.prix} €</Text>
            <TouchableOpacity onPress={() => supprimerDuPanier(item.id)}>
              <Text style={styles.removeText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Votre panier est vide.</Text>}
      />

      {panier.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total : {total.toFixed(2)} €</Text>

          <TouchableOpacity style={styles.payButton} onPress={handlePaiement}>
            <Text style={styles.payButtonText}>Aller au paiement</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={viderPanier}>
            <Text style={styles.clearText}>Vider le panier</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    color: '#555',
  },
  removeText: {
    color: 'red',
    marginTop: 5,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'right',
  },
  payButton: {
    backgroundColor: '#4caf50',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  payButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearText: {
    color: 'red',
    textAlign: 'center',
  },
});
