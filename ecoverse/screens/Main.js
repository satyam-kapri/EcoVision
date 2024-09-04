
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { View, Text,Image } from 'react-native';
import Dashboard from './Dashboard';
import Scanner from './Scanner';
import Reedem from './Reedem';
import Store from './Store'
// import Scanner2 from './Scanner2'
const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel:false,
    headerShown:false,
    tabBarStyle:{
      position: "absolute",
      bottom: 20,
      right: 0,
      left: 25,
      elevation: 10,
      height: 60,
      borderRadius:50,
      width:'85%',
      backgroundColor: "#292929"
    }
  }
export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Dashboard" component={Dashboard} 
       options={{
        tabBarIcon: ({focused})=>{
          return (
            <View style={{alignItems: "center", justifyContent: "center"}}> 
              <Image source={require('../assets/Hut.png')}></Image>
           </View>
          )
        }
      }} />
      <Tab.Screen name="Scan" component={Scanner} 
       options={{
        tabBarIcon: ({focused})=>{
          return (
            <View style={{alignItems: "center", justifyContent: "center",backgroundColor:'#3EC232',borderRadius:50,height:60,width:60,top:-20,elevation:20}}> 
              <Image source={require('../assets/Portrait Mode Scanning.png')}></Image>
           </View>
          )
          
        },tabBarStyle:{display:'none'}
      }} />
      <Tab.Screen name="Reedem" component={Store} 
        options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Image source={require('../assets/Shopping Mall.png')}></Image>
               </View>
              )
            }
          }} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
