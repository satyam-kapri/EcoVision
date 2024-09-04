import React, { useRef,useMemo, useState} from 'react';
// import "react-native-gesture-handler"
import { View, Text, StyleSheet ,Image, ImageBackground, TouchableHighlight,ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {AdventPro_500Medium } from '@expo-google-fonts/advent-pro'
import { useFonts } from "expo-font";
import { BottomSheetModal,BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Login from './Login';
import Register from './Register';

const Welcome= () => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%","70%"], []);
  const [login,setlogin]=useState(false);
  
 const openModal = () => {
    bottomSheetModalRef.current.present();
  };
 

    const [fontsLoaded] = useFonts({
       AdventPro_500Medium,
      });
      if (!fontsLoaded) {
        return null;
      }
     
    

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <LinearGradient
        colors={['#39CC36', '#185E17', '#042804']}
        style={styles.gradient}>
        <ImageBackground source={require('../assets/image-Photoroom.png-Photoroom (1).png')}  imageStyle={{resizeMode:'repeat',opacity:0.2 }}  style={styles.ImageBackground}>
        
        <View style={styles.logocontent}>
          <Image source={require('../assets/image-Photoroom 2.png')} style={{width:150,height:150}}></Image>
          <Text style={[styles.title,{marginTop:30,fontFamily:'AdventPro_500Medium'}]}>Eco-Vision</Text>
          <Text style={[styles.text,{marginTop:10}]}>One stop Solution for </Text>
          <Text style={styles.text}>major environmental problems</Text>
        </View>
        <View style={styles.btncontent}>
            <TouchableHighlight style={styles.signinbtn} onPress={()=>{openModal();setlogin(true);}}>
                <Text style={{color:'white',fontSize:20,fontFamily:'AdventPro_500Medium'}}>Sign In</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.signupbtn} onPress={()=>{openModal();setlogin(false);}}>
                <Text style={{color:'black',fontSize:20,fontFamily:'AdventPro_500Medium'}}>Register</Text>
            </TouchableHighlight>
            <Text style={{marginTop:30,color:'white',fontFamily:'AdventPro_500Medium'}}>By Team EliteMinds- Graphic Era</Text>
        </View>
        </ImageBackground>
      </LinearGradient>
     
      <BottomSheetModalProvider>
      <BottomSheetModal
       ref={bottomSheetModalRef}
       index={0}
       snapPoints={snapPoints}
       style={styles.bottomSheet}
     >
       
         {login?<Login ></Login>:<Register></Register>}
         
     </BottomSheetModal>
   </BottomSheetModalProvider>
   </GestureHandlerRootView>
    
    
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    // transform: [{ rotate: '45deg' }], 
  },
  ImageBackground:{
    flex: 1,
    // opacity:0.3
  },
  logocontent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:150
  },
  btncontent:{
  flex:1,
  justifyContent: 'center',
alignItems: 'center',
marginTop:90
  },
  title:{
    color:'white',
   fontSize:48,
   fontFamily:'AdventPro_500Medium'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily:'AdventPro_500Medium'
  },
  signinbtn:{
    backgroundColor:'#3EC232',
    fontSize:24,
    borderRadius:10,
    width:'80%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'AdventPro_500Medium'
  },
  signupbtn:{
    backgroundColor:'white',
    fontSize:24,
    borderRadius:10,
    width:'80%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    fontFamily:'AdventPro_500Medium'
  }
  ,bottomSheet:{
    flex:1,
    justifyContent:'flex-start',
    paddingTop:0
  }
});

export default Welcome;
