import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
// import { fonts } from "../utils/fonts";
import { useAuth } from "../AuthContext";
const ProductCard = ({ item,handleProductClick }) => {
  const {coins}=useAuth();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleProductClick(item);
      }}
    >
      <Image source={{ uri: item?.link }} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.price}>{item?.price}<Text style={{color:'red'}}>-{coins}coins</Text></Text>
      </View>
      <View style={styles.likeContainer}>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  coverImage: {
    height: 200,
    width: "100%",
    borderRadius: 20,
    position: "relative",
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    // fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  price: {
    fontSize: 18,
    // fontFamily: fonts.medium,
  },
  likeContainer: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    right: 10,
    top: 10,
  },
  faviorate: {
    height: 20,
    width: 20,
  },
});