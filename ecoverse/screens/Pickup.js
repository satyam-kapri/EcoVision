import React from 'react'
import Cards from './Cards'
import { Text,  Image,ImageBackground,View,TouchableOpacity } from 'react-native';
function Pickup({setopenpickup}) {
  return (
    <>
    <View style={{flex:1,alignItems:'center',flexDirection:'row',marginTop:70}}>
            <Image source={require('../assets/image-Photoroom 2.png')} style={{width:50,height:50,marginLeft:20,marginTop:30}}></Image>
            <Text style={{fontSize:20,color:'black'}}>Eco-Vision</Text>
    </View>
    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',marginTop:70}}>
      <Text style={{left:20,fontSize:20}}>Pickups in your Location</Text>
      <TouchableOpacity onPress={()=>{setopenpickup(false);}} style={{right:10}}><Text>Close</Text></TouchableOpacity>
      </View>
    <Cards></Cards>
    </>
  )
}

export default Pickup
