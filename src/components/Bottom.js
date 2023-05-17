import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Icon from "react-native-vector-icons/FontAwesome";

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
        <Text style={{ fontSize: 16, color: "white", marginRight: 10 }}>
          Go to askFundu.com
        </Text>
        <Icon name="share-square-o" size={22} color="white" />
        {/* 
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
    backgroundColor: "#5d20d2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  bottomMenuItem: {
    flexDirection: "row",
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
