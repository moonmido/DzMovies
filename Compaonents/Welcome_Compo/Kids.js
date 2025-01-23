import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { data } from '../All_Data/Data_Movie';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const {width,height} = Dimensions.get('window');

const Kids = ({find}) => {
const navigation = useNavigation();

const [kid,setKids] = useState([]);

const fetchKids=async(page=1)=>{
try {
const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=1c6173051df5e918068c544e0570d02b&with_genres=10762&page=${page}`);
const data = await response.json();
setKids(data.results);
} catch (error) {
  console.error(error);
}
};
useEffect(()=>{
fetchKids();
},[]);



  return (
    <ScrollView style={{marginTop:height*0.025,marginLeft:-10}}
    showsHorizontalScrollIndicator={false}
    horizontal
    >
{
    kid.map((item,index)=>{
      if(item.name.toLowerCase().includes(find.toLowerCase())){
    return(

    <TouchableWithoutFeedback  onPress={()=>navigation.navigate("watch",{
      img : item.poster_path,
      title:item.name,
      type:item.popularity,
      description:item.overview,
      time:item.original_language,
      year:item.first_air_date.split('-')[0],
      age:item.adult ? '18+' : 'PG-13',
      rating:item.vote_average,
    })}>
<View style={{paddingHorizontal:10}} key={index}>
<Image  key={index}    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={{width:width*0.4,height:height*0.2,resizeMode:"cover",borderRadius:35}}/>
<Text  style={{color:"white",marginTop:height*0.015,fontWeight:"700"}} >{
   item.name.length>14 ? item.name.slice(0,14)+'...'  : item.name
    }</Text>
<Text style={{color:"#414848"}}><MaterialCommunityIcons name="family-tree" size={15} color="#414848" /> {item.popularity}</Text>
</View>
</TouchableWithoutFeedback>
)
}})
}

    </ScrollView>
  )
}

export default Kids