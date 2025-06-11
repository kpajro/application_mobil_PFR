import React from "react";
import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function ListeProduits({ navigation }) {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch('https://http://172.26.69.134:8080/api/produits')
      .then(res => res.json())
      .then(data => setProduits(data));
  }, []);

  return (
    <FlatList
      data={produits}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Produit', { id: item.id })}>
          <View style={{ padding: 16 }}>
            <Text>{item.nom}</Text>
            <Text>{item.prix} €</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
