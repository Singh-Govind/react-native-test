import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Bottom = () => {
  const { handleWebViewSettings } = useContext(AppContext);

  return (
    <View style={styles.bottomMenuContainer}>
      <TouchableOpacity
        onPress={
          () => handleWebViewSettings("https://askfundu.com")
          // Linking.openURL("https://askfundu.com").catch((err) =>
          //   console.error("Failed to open link:", err)
          // )
        }
        style={styles.bottomMenuItem}
      >
        <Text style={{ fontSize: 26 }}>Go to askfundu.com</Text>
        {/* <Ionicons name="home-outline" size={25} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomMenuItem}>
        <Ionicons name="search-outline" size={25} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomMenuItem}>
        <Ionicons name="settings-outline" size={25} color="gray" /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottomMenuItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  bottomMenuIcon: {
    marginBottom: 5,
  },
  bottomMenuText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Bottom;
