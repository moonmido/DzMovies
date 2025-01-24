import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashScreen from './SplashScreen';
import Welcome from './Compaonents/Welcome';

const Adapter = () => {

const [issplash,setIssplash] = useState(true);


useEffect(()=>{
    setTimeout(()=>{
setIssplash(false);
    },1500)
})


  return (
    <View>
    {
        issplash ? (<SplashScreen/>) : (<Welcome />)
    }
    </View>
  )
}

export default Adapter