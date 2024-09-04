import React from 'react'
import { View ,Text, ImageBackground,StyleSheet,Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../AuthContext';
import {Icon} from '@rneui/themed';
function Dashboard() {
  const {user,signOut,coins}=useAuth();
  
  // console.log(user);
  return (
   <View style={styles.container}>
      
      <ImageBackground source={require('../assets/image-Photoroom.png-Photoroom (1).png')} imageStyle={{opacity:0.1}} style={styles.header}>
        <Image source={require('../assets/image-Photoroom 2.png')} style={{width:50,height:50}}></Image>
        <Text style={styles.logotext}>Eco-Vision</Text>
        <Icon
        name='log-out'
        type='feather'
        color='black'
        style={{marginLeft:120}}
        onPress={()=>{signOut();}}
      />
      </ImageBackground>
    
      <View style={styles.profile}>
            <LinearGradient
              colors={['rgba(21, 174, 45, 1)', '#276F05']}
              start={{x: 0, y: 0}} 
              end={{x: 1, y: 1}} 
              locations={[0, 1]} 
              angle={45} 
              style={styles.gradient}>
                <View style={styles.userimgwrapper}>
                    <Image source={require('../assets/Ellipse 2.png')} style={styles.userimg}></Image>
                    <View style={{flex:1,marginLeft:20}}>
                    <Text style={styles.usertxt}>{user.username}</Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={{backgroundColor:'rgba(217, 217, 217, 0.33)',borderRadius:10,height:70,width:70,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{color:'white',fontSize:20}}>{coins}</Text>
                      <Text style={{color:'white'}}>Coins</Text>
                    </View>
                    </View>
                </View>
            </LinearGradient>
      </View>
      <Text style={{fontSize:20,left:40,top:-20}}>Our Services</Text>
      <View style={styles.contentcontainer}>
         <View style={{flex:1,left:30}}>
         <Image source={require('../assets/Group 8.png')} style={{width:'85%',height:80,marginTop:10}}></Image>
         <Image source={require('../assets/Group 6.png')} style={{width:'85%',height:80,marginTop:10}}></Image>
         <Image source={require('../assets/Group 10 (1).png')} style={{width:'85%',height:80,marginTop:10}}></Image>
         </View>
      </View>
   </View>

  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  profile:{
    flex:0.4,
    alignItems:'center'
  }
  ,contentcontainer:{
    flex:1,
    
  }
  ,header:{
   flex:0.5,
   justifyContent:'center',
   alignItems:'center',
   flexDirection:'row'
  }
  ,gradient:{
    padding:10,
    width:'80%',
    borderRadius:20,
    transform:[{translateY:-40}],
    justifyContent:'center',
    alignItems:'center',
    elevation:50
    
  }
  ,logotext:{
    fontSize:20,
    fontFamily:'AdventPro_500Medium'
    ,marginLeft:10
  },
  horizontalLine: {
    borderBottomWidth: 1, 
    borderBottomColor: 'white',
    width: '100%', 
    marginVertical: 10,
  },
  userimg:{
    width:70,height:70
  }
  ,userimgwrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'80%'
  }
  ,usertxt:{
    fontSize:20,
    fontFamily:'AdventPro_500Medium',
    color:'white'
  }
})

export default Dashboard
