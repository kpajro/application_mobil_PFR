import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PanierContext = createContext(null);

export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('panier').then(data => {
      if (data) setPanier(JSON.parse(data));
    });
  }, []);

  const ajouterAuPanier = async (article) => {
    const existant = panier.find((item) => item.id === article.id);

    let nouveauPanier;
    if (existant) {
      nouveauPanier = panier.map((item) =>
        item.id === article.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      nouveauPanier = [...panier, { ...article, quantity: 1 }];
    }

    setPanier(nouveauPanier);
    await AsyncStorage.setItem('panier', JSON.stringify(nouveauPanier));
  };

  const supprimerDuPanier = async (id) => {
    const nouveauPanier = panier.filter((item) => item.id !== id);
    setPanier(nouveauPanier);
    await AsyncStorage.setItem('panier', JSON.stringify(nouveauPanier));
  };

  const diminuerQuantite = async (id) => {
    const nouveauPanier = panier
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setPanier(nouveauPanier);
    await AsyncStorage.setItem('panier', JSON.stringify(nouveauPanier));
  };

  const viderPanier = async () => {
    setPanier([]);
    await AsyncStorage.removeItem('panier');
  };

  return (
    <PanierContext.Provider
      value={{ panier, ajouterAuPanier, supprimerDuPanier, viderPanier, diminuerQuantite }}
    >
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => useContext(PanierContext);
