import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Adapter from './Adapter';
import Welcome from './Compaonents/Welcome';
import SignUp from './Compaonents/SignUp';
import SignIn from './Compaonents/SignIn';
import Home from './Compaonents/Home';
import Watch_movie from './Compaonents/Watch_movie';
import Notification from './Compaonents/Notification';
import HomeTab from './Compaonents/Home';
export default function App() {

  const Stack = createStackNavigator();

  return (
<NavigationContainer>
<Stack.Navigator initialRouteName='signin'>
<Stack.Screen name='notification' component={Notification} options={{headerShown:false}}/>
<Stack.Screen name='watch' component={Watch_movie} options={{headerShown:false}}/>
<Stack.Screen name='home' component={Home} options={{headerShown:false}}/>
<Stack.Screen name='signin' component={SignIn} options={{headerShown:false}}/>
<Stack.Screen name='signup' component={SignUp} options={{headerShown:false}}/>
<Stack.Screen name='welcome' component={Welcome} options={{headerShown:false}}/>
<Stack.Screen name='Adapter' component={Adapter} options={{headerShown:false}}/>
<Stack.Screen name='Splash' component={SplashScreen} options={{headerShown:false}}/>
</Stack.Navigator>
</NavigationContainer>

  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
