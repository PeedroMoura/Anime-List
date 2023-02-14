import { StyleSheet,flexDirection } from 'react-native';

export const styles = StyleSheet.create({
    
    listaContainer: {
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
      width:72,
    },
    
    inputContainer: {
      backgroundColor: 'rgba(0,0,0,0.85)',
      borderRadius: 10, 
      marginTop:32.8,
     
      height:50
    },

  });

export const calcula = (x, y) => {
    return x + y;
}