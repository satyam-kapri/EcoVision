import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity,Linking } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { Avatar } from '@rneui/themed';
import { useAuth } from '../AuthContext';
const users=[
    { name: "E Waste Recyclers India", no: "9725364589" },
    // { name: "Green-Recycling-Waste-Management-Services", no: "9990897350" },
    { name: "Waste Recyclers India", no: "7947420448" },
    { name: "A G recyclers", no: "9822783051" },
    { name: "Baba Recyclers", no: "7041636239" },
    { name: "E-waste Recycler", no: "8401884617" },
    { name: "Hin Green E-waste Recycler", no: "7947116505" },
    { name: "Ms Traders", no: "7942679142" },
    { name: "Brp Infotech Recyclers", no: "7947119642" },
    { name: "Waste disposals", no: "7947111120" },
    { name: "RD Recycler", no: "7947112306" },
    { name: "Waste recycle hub", no: "8123417459" },
    { name: "greeniva Recycker Pvt ltd", no: "7947129892" },
    { name: "Recliam Enviro Pvt Ltd", no: "7048837689" },
    { name: "E-swachh", no: "7947433659" },
    { name: "Waste Care Links", no: "7041364931" },
    { name: "Eco Ewaste", no: "7947435050" },
    { name: "Rajora Paper Supplier", no: "7947145253" },
    { name: "Green Recycling", no: "794714534" },
    { name: "Greenzone Recycling Pvt ltd", no: "8123065958" },
    { name: "Namo Ewaste Management ltd", no: "7947148658" }
  ]

const Cards = () => {
    const {setcoins}=useAuth();
    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
        setcoins(pre=>pre+1);
      };

return (
  <>
    <ScrollView>
      <View style={styles.container}>
      <View style={{flex:1,alignItems:'center',justifyContent:'space-between'}}>
        {
        users.map((user,i)=>{
            return(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderRadius:20,backgroundColor:'white',padding:30,width:'90%',marginTop:10}}>
            <View key={i} style={styles.user}>
            <Avatar
          size={50}
          rounded
          title={user.name[0].toUpperCase()}
          containerStyle={{ backgroundColor: 'green' }}
        />
            <Text style={styles.name} >{user.name}</Text>
          </View>
          <Icon
        name='phone'
        type='entypo'
        color='green'
        onPress={()=>{handleCall(user.no);}}
      />

          </View>);
        })
        }
      </View>
      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
container: {
   
  flex: 1,
},
fonts: {
  marginBottom: 8,
},
user: {
  flexDirection: 'row',
  marginBottom: 6,
  alignItems:'center'
},
image: {
  width: 30,
  height: 30,
  marginRight: 10,
},
name: {
  fontSize: 16,
  marginTop: 5,
  marginLeft:10,
 
},
});

export default Cards;