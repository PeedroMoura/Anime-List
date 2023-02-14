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
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Button } from "@rneui/themed";
import { useState, useRef } from "react";
import { Input } from "@rneui/themed";
import { color } from "@rneui/base";
import { Modalize } from "react-native-modalize";
import { where } from "firebase/firestore";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Buscar() {
  
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

  const modal = useRef();
  
  const [itemModal, setItemModal] = useState();

  const [animes, setAnimes] = useState([]);

  const db = getFirestore();
  const auth = getAuth();
  const nav = useNavigation();

  nav.addListener("focus", () => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
    //listando todos
    //trocar para listar apenas os animes de minhaLista que tiverem usuarioID = o uid do usuário logado
    getDocs(
      collection(db, "minhaLista"),
      where("usuarioID", "==", auth.currentUser.uid)
    )
      .then((resultados) => {
        //ToastAndroid.show(resultados, ToastAndroid.LONG)
        const lista = [];
        resultados.forEach((dados) => lista.push(dados.data().anime));
        setAnimes(lista);
      })
      .catch((erro) => {
        console.log(erro);
      });
  });

  

  return (
    <ImageBackground
      source={require("./../../../assets/backGroundImage.jpg")}
      imageStyle={{ opacity: 0.8 }}
      style={styles.buscarContainer}
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
              {/* <Button title={"Adicionar anime"} buttonStyle={styles.buttonContainer} onPress={() => adicionarAnime(itemModal)} color='black' ></Button> */}
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
        {/* <Input
          placeholder="Buscar anime..."
          placeholderTextColor="lightgray"
          leftIcon={{ name: "search", color: "white", marginLeft: 10}}
          inputContainerStyle={styles.inputContainer}
          inputStyle={{ color: "white" }}
        /> */}
        <View style={styles.listagemContainer}>
          <Text
            style={{
              fontSize: 25,
              color: "lightgray",
              marginTop: 10,
              fontStyle: "italic",
            }}
          >
            Meus Animes
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
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
