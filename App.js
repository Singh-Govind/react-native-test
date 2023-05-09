import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AllNews from "./app/component/allNews";
import Test from "./app/component/Test";
import NewsScrollApp from "./app/component/AllNewsCard";
import NewsScrollApp2 from "./app/component/NewNewsCard";
import NewsScrollApp4 from "./app/component/NewsCard3";
import NewsScrollApp5 from "./app/component/NewsCard5";
import NewsScrollApp6 from "./app/component/NewsCard6";
import NewsCard7 from "./app/component/NewsCard7";
import NewsScrollApp8 from "./app/component/NewsCard8";
import NewsScrollApp9 from "./app/component/NewsCard9";

export default function App() {
  return (
    // <View>
    <>
      <StatusBar />
      <NewsScrollApp9 />
    </>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
