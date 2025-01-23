import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const Tv_show = ({find}) => {
  const navigation = useNavigation();
  const [tv, setTv] = useState([]);

  const fetchTv = async (page = 1) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=1c6173051df5e918068c544e0570d02b&page=${page}`);
      const data = await response.json();
      setTv(data.results); // Correct key for the TV show list
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTv();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: height * 0.015, marginLeft: -10 }}
    >
      {tv.map((item, index) => {
        if(item.name.toLowerCase().includes(find.toLowerCase())){

        return(
        <TouchableWithoutFeedback
          key={index}
          onPress={() =>
            navigation.navigate('watch', {
              img: item.poster_path,
              title: item.name, // Corrected to 'name' for TV shows
              type: item.popularity,
              description: item.overview,
              time: item.original_language,
              year: item.first_air_date?.split('-')[0], // Corrected to 'first_air_date'
              age: item.adult ? '18+' : 'PG-13',
              rating: item.vote_average,
            })
          }
        >
          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={{
                width: width * 0.4,
                height: height * 0.2,
                borderRadius: 25,
              }}
            />
            <Text
              style={{
                color: 'white',
                marginTop: height * 0.015,
                fontWeight: '700',
              }}
            >
              {item.name.length > 14 ? item.name.slice(0, 14) + '...' : item.name}
            </Text>
            <Text style={{ color: '#414848' }}><MaterialCommunityIcons name="family-tree" size={15} color="#414848" /> {item.popularity.toFixed(1)}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}})}
    </ScrollView>
  );
};

export default Tv_show;