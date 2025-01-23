import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import { auth, db, createUserWithEmailAndPassword, setDoc, doc,signInWithEmailAndPassword ,collection, onSnapshot,getFirestore } from '../Firebase/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height} = Dimensions.get("window");
const SignUp = () => {


    const [fname,setFname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
const [checked,setChecked] = useState(false);
const navigation  = useNavigation();

const [img,setImg] = useState("");
const handleImg= async()=>{
let result = await ImagePicker.launchCameraAsync({
mediaTypes:['images','videos'],
aspect:[3,4],
quality:1,
allowsEditing:true
});
console.log(result);
if(!result.canceled){
  setImg(result.assets[0].uri);
}
};



    const handleSignUp = async () => {
        try {
          if(checked){
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          // Add user data to Firestore
          await setDoc(doc(db, 'Users', user.uid), {
            email: user.email,
            name : fname,
            profPIC:img,
            CreatedAt: new Date()
          });
    
          console.log('User signed up and added to Firestore:', user);
          console.log('Navigating to signin...');
          navigation.navigate("signin");
        }else{Alert.alert("Please check the Box")}
        } catch (e) {
          setError(e.message);
          Alert.alert("Incorrect Please Try Again !");
          console.error('Error signing up:', e);
        }
      };
        

  return (
    <View style={styles.container}>
    
    <View style={{justifyContent:"center",alignItems:"center",alignContent:"center"}}>
    <Text style={styles.logo_text}><Text style={{color:"red"}}>Dz</Text>Movies <Text style={{color:"red"}}>+</Text></Text>
<View style={{marginTop:height*0.18}}>
<Text style={{color:"white",fontSize:25,fontWeight:"600"}}>Sign Up</Text>
</View>
    </View>
    <View style={{marginLeft:width*0.05}}>
    <View style={{marginTop:50}}>
    <TextInput placeholder='Full Name'  style={styles.text_input} keyboardType="default" value={fname} onChangeText={(e)=>setFname(e)}/>
    <TextInput placeholder='Email'  style={[styles.text_input,{marginTop:height*0.04}]} keyboardType="email-address" value={email} onChangeText={(e)=>setEmail(e)}/>
    <TextInput placeholder='Password'  style={[styles.text_input,{marginTop:height*0.04}]} keyboardType="visible-password" value={password} onChangeText={(e)=>setPassword(e)}/>
    <TouchableOpacity style={{backgroundColor:"transparent",width:width*0.45,padding:10,marginTop:width*0.05,borderRadius:15,marginLeft:width*0.2,borderWidth:1.5,elevation:22,shadowColor:"red",borderColor:"red"}} onPress={handleImg}><Text style={{textAlign:"center",color:"white",fontWeight:"700"}}><Entypo name="images" size={24} color="white" /></Text></TouchableOpacity>
    <View>
    <View>
    <BouncyCheckbox
    style={{position:"absolute",marginTop:height*0.02}}
  size={23}
  fillColor="red"
  unFillColor="#FFFFFF"
  text="I agree with all contract"
  iconStyle={{ borderColor: "red" }}
  onPress={() => setChecked(!checked)}
/>
    </View>
    <TouchableOpacity style={[styles.btn_si,{backgroundColor:"red",borderWidth:0}]} onPress={handleSignUp}>
          <Text style={styles.text_si}>Sign Up</Text>
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
        marginTop:height*0.09,
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


export default SignUp