import React, { useState, useEffect, useRef ,useMemo,useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image,ImageBackground,ActivityIndicator, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './Button';
import { useIsFocused } from '@react-navigation/native';
import { BottomSheetModal,BottomSheetModalProvider,BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScanInfo from './ScanInfo';
import axios from 'axios';
import {articledata} from '../data.js'
import Pickup from './Pickup.js';
// import { useFonts } from "expo-font";
// import {AdventPro_500Medium } from '@expo-google-fonts/advent-pro'
export default function App() {
  // const [fontsLoaded] = useFonts({
  //   AdventPro_500Medium,
  //  });
  //  if (!fontsLoaded) {
  //    return null;
  //  }
  
  const [openarticle,setopenarticle]=useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const bottomSheetModalRef2 = useRef(null);
  const snapPoints2= useMemo(() => ["100%"], []);
  const [wastetype,setwastetype]=useState(null);
  const [loading,setloading]=useState(false);
  const [openpickup,setopenpickup]=useState(false);
 const openModal = () => {

    bottomSheetModalRef.current.present(); 
  };

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);
 useEffect(()=>{
   if(image){
    handleDetect();
   }
 },[image])
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
 

const handleDetect = async () => {
  openModal();
  console.log("yes");
  try {
    const formData = new FormData();
    
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'image.jpg'
    });
    setloading(true);
    const response = await axios.post('http://192.168.66.45:5000/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
   setloading(false);
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const data = response.data;
    console.log(data);
    setwastetype(data);
    
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (<>
    {openpickup===false?
    (<GestureHandlerRootView style={{flex:1}}>
      <View style={{flex:1}}>
        
            <ImageBackground source={require('../assets/image-Photoroom.png-Photoroom (1).png')} imageStyle={{opacity:0.1}} style={{flex:0.3,alignItems:'center',flexDirection:'row'}}>
            <Image source={require('../assets/image-Photoroom 2.png')} style={{width:50,height:50,marginLeft:50,marginTop:30}}></Image>
            <Text style={{marginTop:27,marginLeft:20,fontSize:20,fontFamily:'AdventPro_500Medium'}}>Eco-Vision</Text>
          </ImageBackground>
        
    <View style={styles.container}>
      {(!image && isFocused)? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
              borderRadius:30
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'black' : '#fff'}
            />
          </View>
          
          <View style={{bottom:'-80%',justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={{backgroundColor:'white',width:70,height:70,borderRadius:50}} onPress={takePicture}></TouchableOpacity>
          </View>
         
        </Camera>
      ) : (
        <>                                                                                                                                                                                                                                                          
      
        <Image source={{ uri: image }} style={styles.camera} />
     
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems:'center',
          
          
        }}
      >
        <Button
          title="Re-take"
          onPress={() => setImage(null)}
          icon="retweet"
        />
        {/* <Button title="Save" onPress={handleDetect} icon="check" /> */}
      </View>
     
      <BottomSheetModalProvider  backgroundComponent={BottomSheetBackdrop} >
      <BottomSheetModal
       ref={bottomSheetModalRef}
       index={0}
       snapPoints={snapPoints}
       style={styles.bottomSheet}
       backgroundStyle={{backgroundColor:'white'}}
       backdropComponent={() => (
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      )}
     >
       
      <ScanInfo wastetype={wastetype} loading={loading} setopenarticle={setopenarticle} setopenpickup={setopenpickup}></ScanInfo>
         
     </BottomSheetModal>
   </BottomSheetModalProvider>
   {openarticle && 

      <View style={{backgroundColor:'white',height:'100%',position:'absolute',width:'120%',padding:30}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
        <Text style={{fontSize:20,left:-30}}>How to Recycle/Dispose</Text>
        <Button icon={'cross'} onPress={()=>setopenarticle(false)}></Button>
        </View>
        <Text style={{fontSize:16}}>{articledata[wastetype]?.article}article</Text>
      
      </View>
     }
      </>
      )}

    </View>
    </View>
    </GestureHandlerRootView>):(<Pickup setopenpickup={setopenpickup}></Pickup>)}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F2F2F2',
    padding: 10,
    
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 30,
  },
  topControls: {
    flex: 1,
  },
  bottomSheet:{
  paddingHorizontal:20
  ,elevation:20
  }
});
