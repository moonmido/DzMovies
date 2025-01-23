import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { data } from '../All_Data/Data_Movie';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-elements';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const {width,height} = Dimensions.get('window');



const Populare = ({find}) => {
  const [pop,setPop] = useState([]);
const navigation = useNavigation();




const fetchData = async (page = 1) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1c6173051df5e918068c544e0570d02b&page=${page}`);
    const data = await response.json();
    setPop(data.results); // Ensure you set the state with the `results` array
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchData();
}, []);
  return (
    <ScrollView style={{marginTop:height*0.025,marginLeft:-10}}
    showsHorizontalScrollIndicator={false}
    horizontal
    >
{
    pop.map((item,index)=>{
      if(item.title.toLowerCase().includes(find.toLowerCase())){
      
      return(

    <TouchableWithoutFeedback onPress={()=>navigation.navigate("watch",{
      img : item.poster_path,
      title:item.title,
      type:item.popularity,
      description:item.overview,
      time:item.original_language,
      year:item.release_date.split('-')[0],
      age:item.adult ? '18+' : 'PG-13',
      rating:item.vote_average,
    })}>
<View style={{paddingHorizontal:10}} key={index}>
<Image  key={index}             source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
 style={{width:width*0.7,height:height*0.2,resizeMode:"cover",borderRadius:35}}/>
<Text  style={{color:"white",marginTop:height*0.015,fontWeight:"700"}} >{
   item.title.length>14 ? item.title.slice(0,14)+'...'  : item.title
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

export default Populare