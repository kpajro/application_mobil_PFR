import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { usePanier } from '../../context/PanierContext';
import * as Linking from 'expo-linking';

export default function PanierScreen() {
  const { panier, ajouterAuPanier, diminuerQuantite, supprimerDuPanier, viderPanier } = usePanier();

  const total = panier.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  const handlePaiement = async () => {
    const url = 'https://stripe.com/fr'; // à remplacer plus tard
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Panier</Text>

      <FlatList
        data={panier}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nom}</Text>
            <Text>{item.quantity} × {item.prix} €</Text>
            <Text style={styles.totalLine}>Total : {(item.prix * item.quantity).toFixed(2)} €</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => diminuerQuantite(item.id)}>
                <Text style={styles.actionBtn}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => ajouterAuPanier(item)}>
                <Text style={styles.actionBtn}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => supprimerDuPanier(item.id)}>
                <Text style={styles.removeText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Votre panier est vide.</Text>}
      />

      {panier.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total à payer : {total.toFixed(2)} €</Text>

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
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalLine: {
    color: '#333',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 12,
  },
  actionBtn: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  removeText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 12,
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
