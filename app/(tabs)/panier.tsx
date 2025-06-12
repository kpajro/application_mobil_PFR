import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { usePanier } from '../../context/PanierContext';

export default function PanierScreen() {
  const { panier, supprimerDuPanier, viderPanier } = usePanier();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Votre Panier</Text>

      <FlatList
        data={panier}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 18 }}>{item.nom}</Text>
            <Text>{item.prix} €</Text>
            <TouchableOpacity
              onPress={() => supprimerDuPanier(item.id)}
              style={{ marginTop: 5 }}
            >
              <Text style={{ color: 'red' }}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {panier.length > 0 && (
        <TouchableOpacity
          onPress={viderPanier}
          style={{ backgroundColor: 'red', padding: 10, marginTop: 20 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Vider le panier</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
