import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import Navbar from '@/components/Navbar';
import { AuthContext } from '../_layout';

export default function HomeScreen() {
  const router = useRouter();
  const {isLoggedIn} = useContext(AuthContext)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
        {/* Colonne gauche : texte */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 16 }}>
            Boostez votre productivité avec nos solutions SaaS
          </Text>
          <Text style={{ fontSize: 16, color: '#555', marginBottom: 24 }}>
            Découvrez une sélection de logiciels performants, prêts à l’emploi, conçus pour répondre aux besoins des entreprises modernes. {"\n"}
            Gestion, automatisation, collaboration : trouvez la solution qui vous correspond.
          </Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            {!isLoggedIn && (
              <>
                <TouchableOpacity onPress={() => router.push('auth/register')}>
                  <Text style={{ fontSize: 16, color: '#2563eb', textDecorationLine: 'underline' }}>S’enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('auth/login')}>
                  <Text style={{ fontSize: 16, color: '#2563eb', textDecorationLine: 'underline' }}>Se connecter</Text>
                </TouchableOpacity>
              </>
            )}
            {isLoggedIn && (
              <>
                <TouchableOpacity onPress={() => router.push('auth/logout')}>
                  <Text style={{ fontSize: 16, color: '#2563eb', textDecorationLine: 'underline' }}>Se déconnecter</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Colonne droite : image */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('@/assets/images/home_page_image.png')}
            style={{ width: 200, height: 200, resizeMode: 'contain' }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
