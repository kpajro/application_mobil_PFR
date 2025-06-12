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

      <Text style={styles.question}>Q : Comment modifier mes informations personnelles ?</Text>
      <Text style={styles.answer}>R : Accédez à votre profil et cliquez sur "Modifier le profil" pour mettre à jour vos données.</Text>

      <Text style={styles.question}>Q : Comment supprimer mon compte ?</Text>
      <Text style={styles.answer}>R : Contactez notre support depuis la section "Support", nous traiterons votre demande rapidement.</Text>

      <Text style={styles.question}>Q : Comment ajouter un produit au panier ?</Text>
      <Text style={styles.answer}>R : Depuis la page d’un produit, cliquez sur "Ajouter au panier". Le produit sera enregistré localement.</Text>

      <Text style={styles.question}>Q : Comment fonctionne le paiement ?</Text>
      <Text style={styles.answer}>R : Une fois vos articles sélectionnés, accédez à votre panier et cliquez sur "Aller au paiement". Vous serez redirigé vers Stripe pour finaliser votre commande.</Text>

      <Text style={styles.question}>Q : Quels modes de paiement acceptez-vous ?</Text>
      <Text style={styles.answer}>R : Nous acceptons les paiements par carte bancaire via Stripe.</Text>

      <Text style={styles.question}>Q : Puis-je passer commande sans carte bancaire ?</Text>
      <Text style={styles.answer}>R : Actuellement, seuls les paiements en ligne par carte sont disponibles.</Text>

      <Text style={styles.question}>Q : Comment contacter le support ?</Text>
      <Text style={styles.answer}>R : Vous pouvez accéder à la section "Support" depuis le menu principal et remplir le formulaire de contact.</Text>
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
