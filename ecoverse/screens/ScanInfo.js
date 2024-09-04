import {React ,useRef,useMemo,useState}from 'react'
import { View,Text,ActivityIndicator,StyleSheet, TouchableOpacity } from 'react-native'
import { articledata } from '../data.js';

function ScanInfo({wastetype,loading,setopenarticle,setopenpickup}) {
   
  return (<>
    {loading? <ActivityIndicator size="large" color="#00ff00" />:(
   <View style={{flex:1,justifyContent:'space-between',marginVertical:20}}>
    <TouchableOpacity style={{borderRadius:10,backgroundColor:'#3EC232',width:'100%',padding:16,flexDirection:'row',justifyContent:'space-between'}} onPress={()=>{setopenpickup(true);}}>
        <View>
        <Text style={{fontSize:25,fontFamily:'AdventPro_500Medium',color:'white'}}>{wastetype}</Text> 
        <Text style={{fontSize:16,fontFamily:'AdventPro_500Medium',color:'white'}}>It is recyclable</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <Text style={{fontSize:25,fontFamily:'AdventPro_500Medium',color:'white'}}>{articledata[wastetype]?.cost}</Text>
        <Text style={{fontSize:16,fontFamily:'AdventPro_500Medium',color:'white'}}>Rupees</Text>
        </View>
        
    </TouchableOpacity>
    {console.log(articledata[wastetype])}
    <View style={{borderRadius:10,backgroundColor:'#F2F2F2',width:'100%',padding:16}}>
        <Text style={{fontSize:25,fontFamily:'AdventPro_500Medium',color:'black'}}>{articledata[wastetype]?.carbon[0]}-{articledata[wastetype]?.carbon[1  ]} kg CO2/kg</Text> 
        <Text style={{fontSize:16,fontFamily:'AdventPro_500Medium',color:'black'}}>Carbon Emission</Text>
    </View>
    <TouchableOpacity style={{borderRadius:10,backgroundColor:'#F2F2F2',width:'100%',padding:16,}} onPress={()=>{setopenarticle(true);console.log("yes")}}>
        <Text style={{fontSize:25,fontFamily:'AdventPro_500Medium',color:'black'}}>How to Dispose it properly?</Text> 
        <Text style={{fontSize:16,fontFamily:'AdventPro_500Medium',color:'black'}} >Read full article...</Text>
    </TouchableOpacity>
   </View>
)}
 
   </>
  )
}

export default ScanInfo
