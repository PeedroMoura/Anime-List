import { FlatList, StyleSheet, Text, View, Flex, ScrollView, ImageBackground} from 'react-native';
import { styles } from './styles'
import { Button } from "@rneui/themed";
import { useState } from 'react';
import { Input } from "@rneui/themed";
import { color } from '@rneui/base';

export default function Lista() {


  return (

    <ImageBackground 
      source={require('./../../../assets/backGroundImage.jpg')}
      imageStyle={{opacity:0.8}}
      style={styles.listaContainer}
    >

    <ScrollView>
      <View style={styles.metadeUmContainer}>
      <View style={styles.searchViewContainer}>
      <Input
        placeholder='   Qual anime você deseja procurar?'
        placeholderTextColor='lightgray'
        inputStyle={{color:'white'}}
        inputContainerStyle={styles.inputContainer}
        leftIcon={{name:'search', color:'white'}}
      />
      </View>
      <View style={styles.buttonViewContainer}>
      <Button  buttonStyle={styles.buttonContainer} color={'black'} titleStyle={{fontSize:10}} title={"Todos"}></Button>
      <Button  buttonStyle={styles.buttonContainer} color={'black'} titleStyle={{fontSize:10}} title={"Assistindo"}></Button>
      <Button  buttonStyle={styles.buttonContainer} color={'black'} titleStyle={{fontSize: 9}} title={"Quero Assistir"}></Button>
      <Button  buttonStyle={styles.buttonContainer} color={'black'} titleStyle={{fontSize:10}} title={"Finalizados"}></Button>
      <Button  buttonStyle={styles.buttonContainer} color={'black'} titleStyle={{fontSize:10}} title={"Dropados"}></Button>
      </View>
      </View>

      <View style={styles.metadeDoisContainer}>
        
      </View>
    </ScrollView>

    </ImageBackground>
   
  )};

