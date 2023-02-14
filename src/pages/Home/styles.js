import { StyleSheet,flexDirection } from 'react-native';

export const styles = StyleSheet.create({
    
    homePageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
  
    metadeUmContainer: {
      height:130,
      flexDirection: 'column'
    },

    metadeDoisContainer: {
      
      height:700,
    },

    searchViewContainer:{
      height:1,
      backgroundColor: "black"
    },

    buttonViewContainer: {
        alignItems:'flex-end',
        height:130,
        justifyContent:'space-between',
        flexDirection: "row",
    },

    buttonContainer: {
      opacity:0.85,
      height:50,
      width:350,
      marginBottom:10
    },

    inputContainer: {
      backgroundColor: 'rgba(0,0,0,0.30)',
      borderRadius: 10, 
      marginTop: 8,
      height:50
    },

    listagemContainer: {
      backgroundColor: 'rgba(0,0,0,0.70)',
      width: 330,
      marginTop: 50,
      borderRadius: 5,
      alignItems: 'center',
    }

  });

export const calcula = (x, y) => {
    return x + y;
}