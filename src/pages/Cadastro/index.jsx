import { View, Text, ImageBackground, ScrollView, ToastAndroid } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { Input } from "@rneui/themed";
import { Button } from '@rneui/base';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

export default function Cadastro() {


  const [ email, setEmail ] = React.useState('');
  const [ senha, setSenha ] = React.useState('');
  const [ nome, setNome] = React.useState('');
  const [ sobrenome, setSobrenome] = React.useState('');

  const nav = useNavigation();
  const cadastro = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword (auth, nome, sobrenome, email, senha)
      .then(sucesso => {
        ToastAndroid.show('Usuário cadastrado com sucesso', ToastAndroid.LONG)
        //sucesso.user.uid
        //sucesso.user.email

        nav.navigate('login')


      })
      .catch(erro => {
        ToastAndroid.show('Não foi possivel cadastrar o usuário', ToastAndroid.LONG)

      })
  }
  return (

    
    <ImageBackground 
    source={require('./../../../assets/backGroundImage.jpg')}
    style={styles.cadastroContainer}
    >
    <ScrollView>
    <View style={styles.caixaContainer}>
    <Text style={styles.textContainer}>Nome</Text>
      <Input
      placeholder='  Digite seu nome'
      placeholderTextColor='lightgray'
      inputStyle={{color:'white'}}
      onChangeText={setNome}
      inputContainerStyle={styles.inputContainer}        
    />
    <Text style={styles.textContainer}>Sobrenome</Text>
      <Input
      placeholder='  Digite seu sobrenome'
      placeholderTextColor='lightgray'
      onChangeText={setSobrenome}
      inputStyle={{color:'white'}}
      inputContainerStyle={styles.inputContainer}
    />
    <Text style={styles.textContainer}>Email</Text>
      <Input
      placeholder='  Digite seu Email'
      placeholderTextColor='lightgray'
      inputStyle={{color:'white'}}
      onChangeText={setEmail}
      inputContainerStyle={styles.inputContainer}
    />

    <Text style={styles.textContainer}>Senha</Text>
     <Input
      placeholder='  Digite sua senha'
      placeholderTextColor='lightgray'
      inputStyle={{color:'white'}}
      onChangeText={setSenha}
      inputContainerStyle={styles.inputContainer}
    />
    <Text style={styles.textContainer}>Confirmar Senha</Text>
     <Input
      placeholder='  Confirme sua senha'
      placeholderTextColor='lightgray'
      inputStyle={{color:'white'}}
      inputContainerStyle={styles.inputContainer}
    />
    </View>
    
    <Button  buttonStyle={styles.buttonContainer} color={'black'} title={"Cadastrar"} onPress={cadastro}></Button>
    </ScrollView>
    </ImageBackground>
    
  )
}