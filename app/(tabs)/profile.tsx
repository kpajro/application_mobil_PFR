
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Navbar from '@/components/Navbar';

export default function ProfilScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://172.26.69.134:8080/api/users/${id}`)
        .then(res => setUser(res.data))
        .catch(() => setError('Erreur lors du chargement des données utilisateur'));
    }
  }, [id]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('@/assets/images/default-profile.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.firstname} {user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.info}>Téléphone : {user.phone || 'N/A'}</Text>
        <Text style={styles.info}>Statut : {user.type}</Text>
        <Text style={styles.info}>Adresse : {user.address || 'N/A'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
    minHeight: '100%',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
