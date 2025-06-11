import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default function CguScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Conditions Générales d’Utilisation</Text>

      <Text style={styles.paragraph}>
        Bienvenue sur notre application. En accédant à nos services, vous acceptez les présentes
        conditions d'utilisation.
      </Text>

      <Text style={styles.paragraph}>
        1. Utilisation des services : Vous vous engagez à utiliser l'application de manière légale
        et respectueuse.
      </Text>

      <Text style={styles.paragraph}>
        2. Données personnelles : Les informations que vous fournissez sont utilisées dans le cadre
        strict de notre politique de confidentialité.
      </Text>

      <Text style={styles.paragraph}>
        3. Responsabilité : Nous ne sommes pas responsables des interruptions ou erreurs pouvant
        survenir lors de l'utilisation de nos services.
      </Text>

      <Text style={styles.paragraph}>
        4. Modifications : Nous nous réservons le droit de modifier les CGU à tout moment.
      </Text>

      <Text style={styles.paragraph}>
        En continuant à utiliser l’application, vous acceptez toute mise à jour future de ces
        conditions.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
