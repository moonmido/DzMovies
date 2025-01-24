import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import profile from '../../Images/profile.png'
import { Dimensions } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { auth, db, createUserWithEmailAndPassword, setDoc, doc,signInWithEmailAndPassword ,collection, onSnapshot,getFirestore } from '../../Firebase/FirebaseConfig'
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height} = Dimensions.get("window");

const Profile_section = () => {
  const navigation = useNavigation();


  const [userpro,setUserprof] = useState(null);
const [userPIC,setUserPIC] = useState(null);

  useEffect(()=>{

  
  const handleUSER = async()=>{
    try {
      const userID = await AsyncStorage.getItem("userId");
      console.log("Retrieved UserID:", userID);
  const UserRefDoc =  doc(db,"Users",userID);
  const unsubscribe  = onSnapshot(UserRefDoc,(docSnapshot)=>{
    if(docSnapshot.exists()){
      setUserprof(docSnapshot.data().name);
      setUserPIC(docSnapshot.data().profPIC);
    }
  })
    } catch (error) {
      console.error(error);
    }
    return () => unsubscribe(); // Cleanup listener
  }
  handleUSER();
},[])

  return (
    <View style={{display:"flex",margin:width*0.04}}>
    <View style={{display:"flex",flexDirection:"row"}}>
    <Image source={{uri:userPIC}} style={styles.pic_priofile}/>
    <View style={{paddingLeft:width*0.05,top:3,justifyContent:"space-between",flexDirection:"row"}}>   
    <View>
    <Text style={{color:"white"}}>{userpro}</Text>
     <Text style={{fontSize:11,color:"#4c4c4c"}}>Enjoy your Favorite Movies</Text>
    </View>
     <View style={{marginLeft:width*0.1}}>
     <TouchableWithoutFeedback onPress={()=>navigation.navigate("notification")}>
     <Text><Entypo name="list" size={24} color="white" /></Text>  
     </TouchableWithoutFeedback>
     </View>
    </View>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
pic_priofile:{
width:width*0.15,
height:height*0.077,
borderRadius:55,
backgroundColor:"white",
resizeMode:"cover",
}

})


export default Profile_section