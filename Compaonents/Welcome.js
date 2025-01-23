import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import back from "../Images/ligo.jpg"
import { Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const {width,height} = Dimensions.get("window");
const Welcome = () => {
const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <StatusBar style='light'/>
    <View>
    <Text style={styles.logo_text}><Text style={{color:"red"}}>Dz</Text>Movies <Text style={{color:"red"}}>+</Text></Text>
    </View>
    <View>
    <Image source={back} style={styles.back_img}/>
<LinearGradient colors={['transparent','rgba(23,23,23,0.8)','#141414']}
style={{width , height:height*0.64,position:"absolute"}}
start={{x:0.5,y:0}}
end={{x:0.5,y:1}}
/>
    </View>
    <View style={{marginTop:height*0.18}}>
      <Text style={{textAlign:"center",color:"#cfcecc"}}>Welcome to DzMovies Watch & Enjoy</Text>
      <View style={{marginTop:20}}>
        <TouchableOpacity style={[styles.btn_si,{backgroundColor:"red",borderWidth:0}]} onPress={()=>navigation.navigate("signup")}>
          <Text style={styles.text_si}>Sign Up</Text>
        </TouchableOpacity>
          <View style={{marginTop:15}}>
        <TouchableOpacity style={styles.btn_si} onPress={()=>navigation.navigate("signin")}>
          <Text style={styles.text_si}>Sign In</Text>
        </TouchableOpacity>

        </View>

      </View>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({

container:{
    width:"100%",
    height:"100%",
    backgroundColor:"#141414"
},
back_img:{
    width:width,
    height:height*0.5,
    resizeMode:"cover",
    top:height*0.14,
  },
  logo_text:{
fontSize:29,
color:"white",
textAlign:"center",
top:height*0.1,
display:"flex",
fontWeight:"700",
  },
  btn_si:{
borderWidth:1,
borderColor:"#cfcecc",
width:width*0.8,
marginLeft:width*0.1,
height:height*0.07,
borderRadius:5,
justifyContent:"center",
alignItems:"center"
  },
text_si:{
  textAlign:"center",
  fontWeight:"700",
  color:"white"
}

})


export default Welcome