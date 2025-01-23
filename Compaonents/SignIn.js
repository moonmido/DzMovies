import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { auth,db,doc,setDoc,signInWithEmailAndPassword } from '../Firebase/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height} = Dimensions.get("window");
const SignIn = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
  const navigation = useNavigation();
    const handleSignIn = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log('User signed ID is:', user);
         await AsyncStorage.setItem('userId',user.uid);
         console.log('User signed ID is:', user.uid);
       
navigation.navigate("home");
        } catch (e) {
          setError(e.message);
          console.error('Error signing in:', e);
          Alert.alert("Not ");
        }
      };
    

  return (
    <View style={styles.container}>
    
    <View style={{justifyContent:"center",alignItems:"center",alignContent:"center"}}>
    <Text style={styles.logo_text}><Text style={{color:"red"}}>Dz</Text>Movies <Text style={{color:"red"}}>+</Text></Text>
<View style={{marginTop:height*0.22}}>
<Text style={{color:"white",fontSize:25,fontWeight:"600"}}>Sign In</Text>
</View>
    </View>
    <View style={{marginLeft:width*0.05}}>
    <View style={{marginTop:height*0.09}}>
    <TextInput placeholder='Email'  style={[styles.text_input,{marginTop:height*0.04}]} keyboardType="email-address" value={email} onChangeText={(e)=>setEmail(e)}/>
    <TextInput placeholder='Password'  style={[styles.text_input,{marginTop:height*0.04}]} keyboardType="visible-password" value={password} onChangeText={(e)=>setPassword(e)}/>
    <View>
    <TouchableOpacity style={[styles.btn_si,{backgroundColor:"red",borderWidth:0}]} onPress={handleSignIn}>
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
backgroundColor:"black",
width:"100%",
height:"100%"
},
logo_text:{
    fontSize:29,
    color:"white",
    textAlign:"center",
    top:height*0.1,
    display:"flex",
    fontWeight:"700"
      },
      text_input:{
backgroundColor:"#d6d6d6",
width:width*0.9,
borderRadius:10,
height:height*0.08,
padding:10,
borderRightWidth:5,
borderRightColor:"red"
      },
      btn_si:{
        marginTop:height*0.1,
        borderWidth:1,
        borderColor:"#cfcecc",
        width:width*0.8,
        marginLeft:width*0.05,
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


export default SignIn