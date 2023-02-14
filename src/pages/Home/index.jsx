import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Flex,
  ScrollView,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Button } from "@rneui/themed";
import { useState, useRef } from "react";
import { Input } from "@rneui/themed";
import { color } from "@rneui/base";
import { Modalize } from "react-native-modalize";
import { useEffect } from "react";
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
import { getAuth } from "firebase/auth";
import { LogBox } from "react-native-web";
import { useNavigation } from '@react-navigation/core';

export default function HomePage() {
  const modal = useRef();

  const [itemModal, setItemModal] = useState();

  const [animes, setAnimes] = useState([]);

  const db = getFirestore();
  const auth = getAuth();
  const nav = useNavigation();

  const buscarAnimes = async () => {
    getDocs(collection(db, "animes")).then((resultados) => {
      const lista = [];
      resultados.forEach((dados) => lista.push(dados.data()));

      setAnimes(lista);
    });
  };

  useEffect(() => {
    buscarAnimes();
  }, []);

  const adicionarAnime = async (anime) => {
    addDoc(collection(db, "minhaLista"), {
      usuarioID: auth.currentUser.uid,
      anime,
    })
      .then((sucesso) =>
        ToastAndroid.show("Anime adicionado", ToastAndroid.LONG)
      )
      .catch((erro) => console.log(erro));
  };

  const removerAnime = (anime) => {
    Alert.alert("Remover anime", "Deseja reemover o anime da lista?", [
      {
        text: "Sim",
        onPress: async () => {
          console.log("Removendo anime");
          const documentos = await getDocs(
            query(
              collection(db, "minhaLista"),
              where("usuarioID", "==", auth.currentUser.uid),
              where("anime.nome", "==", anime.nome)
            )
          );
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          console.log(documentos.size);
          if (documentos.size > 0) {
            documentos.forEach((document) => {
              deleteDoc(doc(db, "minhaLista", document.id));
            });
          }

          ToastAndroid.show("Anime removido!", ToastAndroid.LONG);
        },
      },
      { text: "Não" },
    ]);
  };

  const handleLogout = () => {
    auth.signOut()
    nav.navigate('login');
  }

  return (
    <ImageBackground
      source={require("./../../../assets/backGroundImage.jpg")}
      imageStyle={{ opacity: 0.8 }}
      style={styles.homePageContainer}
    >

      
      <Modalize ref={modal} modalStyle={{ padding: 20 }} modalHeight={600}>
        {itemModal != undefined && (
          <View>
            <Image
              style={{ width: 300, height: 500 }}
              source={{ uri: itemModal.imagem }}
            />
            <Text>Anime: {itemModal.nome}</Text>
            <Text>Gêneros: {itemModal.genero}</Text>
            <Text>Episódios: {itemModal.episodios}</Text>
            <Text>Sinopse: {itemModal.sinopse}</Text>
            <View style={{ paddingTop: 10, alignItems: "center" }}>
              <Button
                title={"Adicionar anime"}
                buttonStyle={styles.buttonContainer}
                onPress={() => adicionarAnime(itemModal)}
                color="black"
              ></Button>
              <Button
                title={"Remover anime"}
                buttonStyle={styles.buttonContainer}
                onPress={() => removerAnime(itemModal)}
                color="black"
              ></Button>
            </View>
          </View>
        )}
      </Modalize>

      <ScrollView>
        <View style={styles.listagemContainer}>
          <Input
            placeholder="Buscar anime..."
            placeholderTextColor="lightgray"
            leftIcon={{ name: "search", color: "white", marginLeft: 10 }}
            inputContainerStyle={styles.inputContainer}
            inputStyle={{ color: "white" }}
          />
          <Text
            style={{
              fontSize: 25,
              color: "lightgray",
              textAlign: "center",
              paddingBottom: 25,
              fontStyle: "italic",
            }}
          >
            ANIMES POPULRES
          </Text>
          <FlatList
            data={animes}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  modal.current?.open();
                  setItemModal(item);
                }}
              >
                <Image
                  style={{ width: 250, height: 400 }}
                  source={{ uri: item.imagem }}
                />
                <Text
                  style={{
                    color: "lightgray",
                    fontWeight: "300",
                    fontFamily: "bold",
                    fontSize: 20,
                    paddingBottom: 5,
                    textAlign: "center",
                    paddingBottom: 3,
                    paddingTop: 3,
                  }}
                >
                  {item.nome}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Sair" buttonStyle = {styles.buttonContainer} onPress={handleLogout} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
