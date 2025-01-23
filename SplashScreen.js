import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import logo from './Images/logo.png'
const SplashScreen = () => {
    const {width,height} = Dimensions.get("window");
  return (
    <View style={{width:"100%",height:"100%",backgroundColor:"#F2AA4C"}}>
    <View style={{alignItems:"center",marginTop:height*0.2}}>
<Image source={logo} style={{width:width*0.5,height:height*0.5,resizeMode:"cover"}}/>
    </View>
    </View>
  )
}

export default SplashScreen