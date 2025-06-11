import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default function FAQScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Foire Aux Questions (FAQ)</Text>

      <Text style={styles.question}>Q : Comment créer un compte ?</Text>
      <Text style={styles.answer}>R : Depuis la page d’accueil, cliquez sur "S’enregistrer" et remplissez le formulaire.</Text>

      <Text style={styles.question}>Q : Que faire en cas de problème de connexion ?</Text>
      <Text style={styles.answer}>R : Vérifiez votre email et mot de passe, ou cliquez sur "Mot de passe oublié".</Text>

      <Text style={styles.question}>Q : Puis-je utiliser les services sans créer de compte ?</Text>
      <Text style={styles.answer}>R : Non, un compte est nécessaire pour accéder aux fonctionnalités.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  answer: {
    fontSize: 16,
    marginTop: 4,
    lineHeight: 22,
  },
});
