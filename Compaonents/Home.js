import { View, Text,StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile_section from './Welcome_Compo/Profile_section'
import { StatusBar } from 'expo-status-bar'
import { Dimensions } from 'react-native'
import { auth, db, createUserWithEmailAndPassword, setDoc, doc,signInWithEmailAndPassword ,collection, onSnapshot,getFirestore } from '../Firebase/FirebaseConfig'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Populare from './Welcome_Compo/Populare'
import Tv_show from './Welcome_Compo/Tv_show'
import Welcome from './Welcome'
import Kids from './Welcome_Compo/Kids'
import AsyncStorage from '@react-native-async-storage/async-storage'
const {width,height} = Dimensions.get("window");


const Home = () => {

    const [search,setSearch] = useState("");
const [userpro,setUserprof] = useState([]);

const handleUSER = async()=>{
  try {
    const userID = await AsyncStorage.getItem("userId");
const UserRefDoc =  doc(db,"Users",userID);
const unsebscribe = onSnapshot(UserRefDoc,(docSnapshot)=>{
  if(docSnapshot.exists){
setUserprof(docSnapshot.data());
  }
})
  } catch (error) {
    console.error(error);
  }
}

    
  return (
    
    <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <StatusBar style='light'/>
      <Profile_section />
<View style={{margin:0.04*width}}>
<TextInput value={search} placeholderTextColor={"#cacaca"} onChangeText={(e)=>setSearch(e)} placeholder='Search...' style={{backgroundColor:"#484848",color:"white",borderRadius:10,height:height*0.07,padding:10}}/>
</View>
<View style={{margin:width*0.04}}>
  <Text style={{color:"white",fontSize:18,fontWeight:"700"}}>Popular movies</Text>
<Populare find={search}/>
</View>
<View style={{margin:width*0.04}}>
  <Text style={{color:"white",fontSize:18,fontWeight:"700"}}>Tv shows</Text>
<Tv_show   find={search} />
</View>
<View style={{margin:width*0.04}}>
  <Text style={{color:"white",fontSize:18,fontWeight:"700"}}>Kids</Text>
<Kids   find={search}/>
</View>

</ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"#141414",
    },
});    





export default Home
