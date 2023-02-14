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

export default function Loja() {
  const modal = useRef();

  const modal1 = useRef();

  const [itemModal, setItemModal] = useState();

  const [figures, setFigures] = useState([]);

  const db = getFirestore();
  const auth = getAuth();

  const buscarFigures = async () => {
    getDocs(collection(db, "figures")).then((resultados) => {
      const lista = [];
      resultados.forEach((dados) => lista.push(dados.data()));

      setFigures(lista);
    });
  };

  useEffect(() => {
    buscarFigures();
  }, []);

  return (
    <ImageBackground
      source={require("./../../../assets/backGroundImage.jpg")}
      imageStyle={{ opacity: 0.8 }}
      style={styles.lojaContainer}
    >
      <Modalize
        ref={modal1}
        modalStyle={{  zIndex: 999 }}
        modalHeight={327}
      >
        <Image
          style={{ height: 327, width: "100%", resizeMode:"contain" }}
          source={{uri:"https://i.imgur.com/qfCbsd5.png"}}
        />
      </Modalize>

      <Modalize
        ref={modal}
        modalStyle={{ padding: 20, zIndex: 1 }}
        modalHeight={600}
      >
        {itemModal != undefined && (
          <View>
            <Image
              style={{ width: 350, height: 400 }}
              source={{ uri: itemModal.imagem }}
            />
            <Text>Nome: {itemModal.nome}</Text>
            <Text>Preço: {itemModal.valor}</Text>
            <Text>Tamanho: {itemModal.tamanho}</Text>
            <View style={{ paddingTop: 10, alignItems: "center" }}>
              <Button
                title={"Comprar Figure"}
                buttonStyle={styles.buttonContainer}
                color="black"
                onPress={() => {
                  modal.current?.close();

                  modal1.current?.open();
                }}
              ></Button>
              <Button
                title={"Adicionar ao Carrinho"}
                buttonStyle={styles.buttonContainer}
                color="black"
              ></Button>
            </View>
          </View>
        )}
      </Modalize>

      <ScrollView>
        <View style={styles.listagemContainer}>
          <Input
            placeholder="Buscar figure..."
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
            FIGURES POPULARES
          </Text>
          <FlatList
            data={figures}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  modal.current?.open();
                  setItemModal(item);
                }}
              >
                <Image
                  style={{ width: 320, height: 300 }}
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
