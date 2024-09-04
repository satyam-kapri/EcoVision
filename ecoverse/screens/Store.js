import {
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    View,
    Linking
  } from "react-native";
  import React, { useState,useRef,useMemo } from "react";
  import { LinearGradient } from 'expo-linear-gradient';
  import ProductCard from "./ProductCard";
  import {prod_data} from '../prod_data.js';
  import { BottomSheetModal,BottomSheetModalProvider,BottomSheetBackdrop, TouchableOpacity } from '@gorhom/bottom-sheet';
  import { GestureHandlerRootView } from 'react-native-gesture-handler';
  import {AdventPro_500Medium } from '@expo-google-fonts/advent-pro'
  import { useAuth } from "../AuthContext.js";
  const HomeScreen = () => {
    const {coins}=useAuth();
    const [products, setProducts] = useState(prod_data.bottle);
    const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
   const [sitem,setsitem]=useState(null);
   const handleProductClick=(item)=>{
    bottomSheetModalRef.current.present(); 
    setsitem(item);
   }
   const handleRedirect = (item) => {
    
  Linking.openURL(item.site);
  };
    return (
        <GestureHandlerRootView style={{flex:1}}>
        <Image source={require('../assets/Group 35.png')} style={{width:'100%',height:200}}></Image>
        <Image source={require('../assets/image-Photoroom 2.png')} style={{width:50,height:50,top:-150,left:150}}></Image>
        <Text style={{top:-145,left:130,fontSize:23,color:'white'}}>Eco-Vision</Text>
      <View colors={["#E8FEDA"]} style={styles.container}>
      <View style={{top:-100}}>
                  <Text style={styles.headingText}>Eco-Friendly Products</Text>
                  <View style={styles.inputContainer}>
                    {/* <Image
                      source={require("../assets/search.png")}
                      style={styles.searchIcon}
                    /> */}
                    <TextInput placeholder="Search" style={styles.textInput} />
                  </View>
       </View>
  
        <FlatList
          ListHeaderComponent={
            <>
              <> 
              </>
            </>
          }
          style={{top:-80}}
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
             handleProductClick={handleProductClick}
            
            />
          )}
          showsVerticalScrollIndicator={false}
        />
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
     <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%'}}>
        <Image source={{uri:sitem?.link}}  style={styles.coverImage}></Image>
        <View style={{marginLeft:10}}>
        <Text style={{fontSize:20}}>{sitem?.name}</Text> 
        <Text>{sitem?.desc}</Text> 
        
        </View>
    </View> 
    <Text style={{fontSize:20}}>{sitem?.price}<Text style={{color:'red'}}>-{coins}coins</Text></Text>
    <TouchableOpacity style={{backgroundColor:'#3EC232',borderRadius:10,justifyContent:'center',alignItems:'center',width:'98%',height:50,marginTop:20}} onPress={()=>{handleRedirect(sitem)}}>
            <Text style={{color:'white'}}>Buy Now</Text>
        </TouchableOpacity>
     </BottomSheetModal>
   </BottomSheetModalProvider>
   </GestureHandlerRootView>
      
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      padding: 20,
    },
    coverImage: {
        height: 100,
        width: 100,
        borderRadius: 20,
        position: "relative",
      },
    headingText: {
      fontSize: 28,
      color: "#000000",
      marginVertical: 20,
      fontFamily: "AdventPro_500Medium",
    },
    inputContainer: {
      width: "100%",
      backgroundColor: "#FFFFFF",
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      flexDirection: "row",
    },
    searchIcon: {
      height: 26,
      width: 26,
      marginHorizontal: 12,
    },
    textInput: {
      fontSize: 18,
      fontFamily: "Poppins-Regular",
    },
    bottomSheet:{
        paddingHorizontal:20
        ,elevation:20
        }
  });