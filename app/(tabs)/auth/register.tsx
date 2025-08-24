
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Switch, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import Navbar from '@/components/Navbar';
import Constants from 'expo-constants';
const extra = Constants.expoConfig?.extra || {};
const API_BASE_URL = extra.API_BASE_URL;


export default function RegisterScreen() {
  const router = useRouter();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('particulier');
  const [birthdayDate, setDateOfBirth] = useState(new Date(2000, 0, 1));
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdayDate;
    setShow(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleRegister = async () => {
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    if (!acceptedTerms) {
      Alert.alert('Erreur', 'Vous devez accepter les CGU.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ firstname, lastname, email, password, accountType, birthdayDate, phoneNumber, country })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue');
      }

      Alert.alert('Succès', `${birthdayDate}`);
      router.replace('/(tabs)/login');
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Créer un compte</Text>

      <Text>Prénom</Text>
      <TextInput value={firstname} onChangeText={setFirstname} style={styles.input} />

      <Text>Nom</Text>
      <TextInput value={lastname} onChangeText={setLastname} style={styles.input} />

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} />

      <Text>Numéro de Telephone</Text>
      <TextInput value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" secureTextEntry style={styles.input} />

      <Text>Pays de résidence</Text>
      <Picker selectedValue={country} onValueChange={(itemValue) => setCountry(itemValue)} style={styles.input}>
        <Picker.Item label="France" value="FR" />
        <Picker.Item label="Royaume Uni" value="UK" />
        <Picker.Item label="Etats Unis" value="USA" />
        <Picker.Item label="Italie" value="IT" />
      </Picker>


      <Text>Date de naissance</Text>
      <Button onPress={showDatepicker} title={birthdayDate.toLocaleDateString()} />

      {show && (
        <DateTimePicker
          value={birthdayDate}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}

      <Text>Mot de passe</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

      <Text>Confirmer le mot de passe</Text>
      <TextInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} />


      <Text>Type de compte</Text>
      <Picker selectedValue={accountType} onValueChange={(itemValue) => setAccountType(itemValue)} style={styles.input}>
        <Picker.Item label="Particulier" value="particulier" />
        <Picker.Item label="Entreprise" value="entreprise" />
      </Picker>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, flexWrap: 'wrap' }}>
        <Switch value={acceptedTerms} onValueChange={setAcceptedTerms} />
          <Text style={{ marginLeft: 8 }}>
          J'accepte les{' '}
            <Text 
            style={{ color: '#2563eb', textDecorationLine: 'underline' }}
            onPress={() => router.push('/cgu')}
            >
              CGU
            </Text>
          </Text>
      </View>

      <TouchableOpacity onPress={handleRegister} disabled={loading} style={styles.button}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {loading ? 'Chargement...' : "S'enregistrer"}
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text>
          Vous avez déjà un compte ?{' '}
          <Text
            style={{ color: '#2563eb', textDecorationLine: 'underline' }}
            onPress={() => router.push('/(tabs)/login')}
          >
            Se connecter
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
};