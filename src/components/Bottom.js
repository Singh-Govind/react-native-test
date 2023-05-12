import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Bottom = () => {
  return (
    <View style={styles.bottomMenuContainer}>
      <TouchableOpacity style={styles.bottomMenuItem}>
        <Ionicons name="home-outline" size={25} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomMenuItem}>
        <Ionicons name="search-outline" size={25} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomMenuItem}>
        <Ionicons name="settings-outline" size={25} color="gray" />
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
