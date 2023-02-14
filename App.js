import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavegacaoPrincipal } from './src/navigations';
import Cadastro from './src/pages/Cadastro';
import HomePage from './src/pages/Home';
import Lista from './src/pages/Lista';
import Login from './src/pages/Login';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from './src/config/firebase';
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function App() {

  initializeApp(firebaseConfig);
  return (
    <View style={styles.container}>
      <NavegacaoPrincipal/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
