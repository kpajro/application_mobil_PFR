'use client';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

function NavLink({
  icon,
  label,
  route,
  onClose,
}: {
  icon: any;
  label: string;
  route: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const path = route.toLowerCase() === 'index' ? '/(tabs)' : `/(tabs)/${route.toLowerCase()}`;

  const handlePress = () => {
    onClose();
    router.push(path);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.navLink}>
      <Ionicons name={icon} size={20} color="#111" style={{ marginRight: 12 }} />
      <Text style={styles.link}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function Navbar({ isLoggedIn = false, isAdmin = false, panierCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const panierLabel = panierCount > 0 ? `Mon panier (${panierCount})` : 'Mon panier';

  return (
    <SafeAreaView style={styles.navbar}>
      <TouchableOpacity onPress={() => useRouter().push('/(tabs)')}>
        <Image
          source={require('@/assets/images/logo-cyna.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="#2563eb" />
      </TouchableOpacity>
      <Modal
        visible={menuOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)} />
        <View style={styles.drawer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setMenuOpen(false)}>
            <Ionicons name="close" size={32} color="#2563eb" />
          </TouchableOpacity>
          <View style={styles.drawerContent}>
            <View style={styles.drawerLinks}>
              <NavLink icon="home" label="Accueil" route="Index" onClose={() => setMenuOpen(false)} />
              <NavLink icon="list" label="Catégories" route="Categories" onClose={() => setMenuOpen(false)} />
              <NavLink icon="search" label="Rechercher" route="Search" onClose={() => setMenuOpen(false)} />
              {isLoggedIn ? (
                <>
                  <NavLink icon="person" label="Mon profil" route="auth/profile" onClose={() => setMenuOpen(false)} />
                  <NavLink icon="cart" label={panierLabel} route="auth/panier" onClose={() => setMenuOpen(false)} />
                  <NavLink icon="log-out" label="Se déconnecter" route="auth/logout" onClose={() => setMenuOpen(false)} />
                </>
              ) : (
                <>
                  <NavLink icon="cart" label={panierLabel} route="auth/panier" onClose={() => setMenuOpen(false)} />
                  <NavLink icon="log-in" label="Se connecter" route="auth/login" onClose={() => setMenuOpen(false)} />
                  <NavLink icon="id-card" label="S'enregistrer" route="auth/register" onClose={() => setMenuOpen(false)} />
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    padding: 12,
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 40,
  },
  menuButton: {
    marginRight: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#e0e7ff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 30,
    zIndex: 10,
  },
  drawerContent: {
    alignItems: 'center',
    paddingTop: 80,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  drawerLinks: {
    alignItems: 'flex-start',
    width: '80%',
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  link: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
