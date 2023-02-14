import { View, Text, ImageBackground,ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { Input } from "@rneui/themed";
import { Button, color } from '@rneui/base';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

export default function Login() {
  

  const [ login, setLogin ] = React.useState('')
  const [ senha, setSenha ] = React.useState('')

  const nav = useNavigation();
  const [ erro, setErro ] = useState('');

  const logar =  () => {
  //   setErro(null);
  //   //await new Promise(resolve => setTimeout(resolve, 1000));

  //   if (login == 'leticiafgoncalves@gmail.com' && senha == '1307')
  //     nav.navigate('home');
  //   else
  //     setErro("Email ou senha incorretos")
  
    const auth = getAuth();
    signInWithEmailAndPassword (auth, login, senha)
    .then(usuarioLogado =>{
      ToastAndroid.show('Login efetuado com sucesso!', ToastAndroid.LONG)
      nav.navigate('home');
    })
    .catch(erro => {
      ToastAndroid.show('Email ou senha incorretos!', ToastAndroid.LONG)
    })
  }
  
  return (

    <ImageBackground 
      source={require('./../../../assets/backGroundImage.jpg')}
      imageStyle={{opacity:0.8}}
      style={styles.loginContainer}
    >
      
    <View style={styles.caixaContainer}> 
    
      <Text style={styles.textContainer}>LOGIN</Text>
      <Input
      placeholder='Digite seu Login'
      placeholderTextColor='lightgray'
      inputStyle={{color:'white'}}
      inputContainerStyle={styles.inputContainer}
      leftIcon={{name:'person', color:'white'}}
      value={login} onChangeText={setLogin}
    />
    <Text style={styles.textContainer}>SENHA</Text>
     <Input
      placeholder='Digite sua senha'
      placeholderTextColor='lightgray'
      leftIcon={{name:'lock', color:'white'}}
      inputContainerStyle={styles.inputContainer}
      inputStyle={{color:'white'}}
      secureTextEntry={true}
      value={senha} onChangeText={setSenha} 
    />

    </View>
    
    <Button  buttonStyle={styles.buttonContainer} color='black' title={"Confirmar"} raised= {true} onPress={logar} />
    <Text style={styles.cadastroContainer} onPress={()=> nav.navigate('cadastro')}>
      Não possui cadastro ainda? Tá esperando o que? Clique aqui e faça seu cadastro agora!
    </Text>
    </ImageBackground>

    
  )
}