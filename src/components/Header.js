import { View, StyleSheet, StatusBar, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      {/* <Ionicons name="menu-outline" size={28} color="black" /> */}
      <View></View>
      <Image
        style={styles.logo}
        source={{
          uri: "https://www.askfundu.com/static/media/askfunduLogo.8d6f3f280186de132173.png",
        }}
      />
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.length + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    // paddingTop: 20,
    // paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  logo: {
    width: 100,
    height: 40,
    // marginLeft: -28,
  },
});

export default Header;
