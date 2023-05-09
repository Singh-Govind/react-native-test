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

export default function App() {
  return <NewsScrollApp6 />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
