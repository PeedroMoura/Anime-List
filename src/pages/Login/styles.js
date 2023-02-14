import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
      alignItems:'center',
    },

    buttonContainer: {
     justifyContent:'center',
     
     width:300,
    },

   caixaContainer: {
    height:230,
    width: 320,
    backgroundColor: 'rgba(54,54,54,0.7)',
    justifyContent: 'center',
    borderRadius: 20,
    paddingTop: 30,
    marginBottom: 5,
    opacity: 50
   },

   inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
	  borderRadius: 30, 
	  padding:3,
	  marginBottom: 3,

   },

   textContainer: {
    color: 'white',
    paddingLeft: 20,
    marginBottom: 8,
    fontSize: 15
   },

   cadastroContainer: {
    color: 'white',
    fontSize: 20,
    textDecorationLine: 'underline',
    margin: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10
   },

   erroLogin: {
    color:'white'
   }

  });

 
