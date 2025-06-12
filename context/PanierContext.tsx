// /context/PanierContext.tsx
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
    const nouveauPanier = [...panier, article];
    setPanier(nouveauPanier);
    await AsyncStorage.setItem('panier', JSON.stringify(nouveauPanier));
  };

  const supprimerDuPanier = async (id) => {
    const nouveauPanier = panier.filter((item) => item.id !== id);
    setPanier(nouveauPanier);
    await AsyncStorage.setItem('panier', JSON.stringify(nouveauPanier));
  };

  const viderPanier = async () => {
    setPanier([]);
    await AsyncStorage.removeItem('panier');
  };

  return (
    <PanierContext.Provider value={{ panier, ajouterAuPanier, supprimerDuPanier, viderPanier }}>
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => useContext(PanierContext);
