
import { View, Text, StyleSheet, Alert, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import Navbar from '@/components/Navbar';
import { apiFetch } from '@/utils/apiFetch';


export default function ProfilScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
  }, []);

  const handleRefresh = useCallback(() => {
      setRefreshing(true);
      getProfile();
    }, []);

  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("PROFILE:", token);
      const profile = await apiFetch(`/api/profile`,
        { method: "GET"},
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'AppMobile/1.0', 'ngrok-skip-browser-warning': 'true' }}
      )

      console.log("PROFILE:", profile);
      setUser(profile);
    } catch (err) {
      console.error("ERROR:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    }
          >
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.info}>Loading profile...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>⚠️ {error}</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Image
            source={require('@/assets/images/default-profile.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>
            {user?.firstname} {user?.name}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.details}>
            <Text style={styles.info}>Telephone: {user?.phoneNumber || 'N/A'}</Text>
            <Text style={styles.info}>Pay: {user?.country || 'N/A'}</Text>
            <Text style={styles.info}>Compte: {user?.accountType ? "Particulier" : "Entreprise"}</Text>
          </View>
        </View>
      )}
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
