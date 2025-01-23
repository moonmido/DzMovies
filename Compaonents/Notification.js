import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image, StatusBar, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, onSnapshot,doc,getDoc } from "../Firebase/FirebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get("window");
const Notification = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [FavM, setFavM] = useState([]); // Initial empty array of users
    const db = getFirestore(); // Get Firestore instance



const handleFavMovies= async()=>{
    try {
        const userID = await AsyncStorage.getItem('userId');
        const fav = await getDoc(doc(db,"Users",userID));
if(fav.exists){
    const {favoriteMovies} = fav.data();
    console.log("movies list is ",favoriteMovies);
    setFavM(favoriteMovies);
}
    } catch (error) {
        console.error(error);
    }


}





    useEffect(() => {
        handleFavMovies();
    });

    



  return (
    <View style={styles.container}>
    <View style={{margin:width*0.07,marginTop:height*0.08}}>
    <View style={{flexDirection:"row"}}>
    <TouchableOpacity style={{width:width*0.1,height:height*0.05}} onPress={()=>navigation.navigate("home")}>
    <Text><AntDesign name="back" size={24} color="white" /></Text>   
    </TouchableOpacity>
    </View>
    
<FlatList 
data={FavM}
renderItem={({item})=>(
    <View key={item.key} style={{justifyContent:"center",marginTop:height*0.04,padding:13,display:"flex",flexDirection:"row",borderRadius:15,borderRightColor:"red",borderRightWidth:10}}>
    <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.img}`}} style={{width:width*0.2,height:height*0.1,resizeMode:"cover",borderRadius:15}}/>
    <View style={{paddingLeft:10,width:"80%",justifyContent:"center"}}>
    <Text style={{color:"white",fontWeight:"700"}}>{item.title}</Text>
    </View>
    </View>
   

)}
/>   
    </View>
    </View>
  )
}
const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"#141414",
    },

});    

export default Notification