import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db, createUserWithEmailAndPassword, setDoc, doc,signInWithEmailAndPassword ,collection, onSnapshot,getFirestore } from '../Firebase/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';

const {width,height} = Dimensions.get("window");
const Watch_movie = ({route}) => {

const {title,img,type,description,time,rating,year,age} = route.params;
const [save,isSave] = useState(false);


const handleDelete=async()=>{
try {
  const userID = await AsyncStorage.getItem('userId');
  if (!userID) {
    console.error('User ID not found in AsyncStorage');
    return;
  }
await updateDoc(doc(db, 'Users', userID),{
  favoriteMovies:arrayRemove({title,img}),
})
console.log("Removed ");
} catch (error) {
  console.error(error);
}

  
}



const handleSave=async()=>{
  try {
  const userID = await AsyncStorage.getItem('userId');
  if (!userID) {
    console.error('User ID not found in AsyncStorage');
    return;
  }

  await updateDoc(doc(db, 'Users', userID), {
    favoriteMovies: arrayUnion({title,img}), // Add movie to the array
  });


  console.log('Favorite movie added successfully!');
} catch (error) {
  console.error('Error adding favorite movie:', error);
}
};


const SAVE_KEY = `${title}_saved`; // Unique key for this movie's save status

// Load the save state when the component mounts
useEffect(() => {
  const loadSaveState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(SAVE_KEY);
      if (savedState !== null) {
       isSave(JSON.parse(savedState)); // Convert string to boolean
      }
    } catch (error) {
      console.error("Failed to load save state:", error);
    }
  };

  loadSaveState();
}, []);

// Save the state to AsyncStorage whenever it changes
useEffect(() => {
  const storeSaveState = async () => {
    try {
      await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  };

  storeSaveState();
}, [save]);



useEffect(() => {
  console.log('Save state updated:', save);
  if(save){
    handleSave();
    console.log("Saved");
  }else{
handleDelete();
  }

}, [save]); // This will run whenever `save` changes


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{width:"100%",height:"100%",backgroundColor:"#131313"}}>
<View>

<Image source={{ uri: `https://image.tmdb.org/t/p/w500${img}` }}style={{width:width,height:height*0.52,resizeMode:"cover"}}/>
<LinearGradient colors={['transparent','rgba(23,23,23,0.8)','#131313']}
style={{width , height:height*0.52,position:"absolute"}}
start={{x:1,y:0.6}}
end={{x:1,y:1}}
/>

<View style={{margin:height*0.02,width:width*0.9,justifyContent:"center"}}>
<View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
<Text style={{color:"white",fontSize:17,fontWeight:"700"}}>{title}</Text>
<TouchableOpacity style={{marginTop:height*0.02}}onPress={()=>{
    isSave(prevSave => !prevSave); // Use functional update
    }}>
<MaterialIcons name="save-alt" size={24} color={save?"red":"white"} />
</TouchableOpacity>

</View>
    <Text style={{color:"#414848"}}><MaterialCommunityIcons name="family-tree" size={15} color="#414848" /> {type}</Text>
    <Text style={{marginTop:height*0.05,fontSize:15,color:"#D9D9D9"}}>{description}</Text>
    <View style={{marginTop:height*0.06 , display:"flex",flexDirection:"row",justifyContent:"space-around",marginHorizontal:-5}}>
    <Text style={styles.catigorie}>{age}</Text>
    <Text style={styles.catigorie}>{year}</Text>
    <Text style={styles.catigorie}><AntDesign name="star" size={12} color="gold" /> {rating}</Text>
    <Text style={styles.catigorie}><Ionicons name="time-outline" size={10} color="#D9D9D9" /> {time}</Text>
    
    </View>
    <View>
    <TouchableOpacity style={[styles.btn_si,{backgroundColor:"red",borderWidth:0}]}>
              <Text style={styles.text_si}>Watch now</Text>
            </TouchableOpacity>
    </View>

</View>

</View>


    </ScrollView>
  )
}


const styles = StyleSheet.create({
catigorie:{
color:"white" ,
 backgroundColor:"#292929",
 paddingHorizontal:10,
 paddingVertical:5,
 borderRadius:25,
},
text_si:{
    textAlign:"center",
    fontWeight:"700",
    color:"white"
  },
  btn_si:{
    marginTop:height*0.05,
    borderWidth:1,
    borderColor:"#cfcecc",
    width:width*0.9,
    height:height*0.08,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center"
      },


})

export default Watch_movie