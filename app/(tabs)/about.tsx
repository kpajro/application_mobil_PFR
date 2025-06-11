import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>À propos de Cyna Solutions</Text>

      <Text style={styles.paragraph}>
        Cyna Solutions est une entreprise spécialisée dans la conception et la distribution de solutions SaaS innovantes. Notre objectif est de fournir aux particuliers et professionnels des outils fiables et efficaces pour gérer leurs activités au quotidien.
      </Text>

      <Text style={styles.paragraph}>
        Que vous soyez une petite entreprise à la recherche d’une solution de gestion simple ou une structure plus grande nécessitant des outils plus poussés, notre catalogue répond à vos besoins.
      </Text>

      <Text style={styles.paragraph}>
        L’équipe de Cyna Solutions est composée de développeurs passionnés, de designers créatifs et d’experts en expérience utilisateur. Ensemble, nous construisons des applications qui simplifient la vie de nos utilisateurs.
      </Text>

      <Text style={styles.paragraph}>
        Pour toute question ou demande, n’hésitez pas à nous contacter à l’adresse : contact@cyna-solutions.fr.
      </Text>
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
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
  },
});
