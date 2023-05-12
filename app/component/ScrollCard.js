import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const apiUrl = "https://askfundu.com:5000/get-all-news"; // Replace with your own API endpoint URL

const Card = ({ article }) => (
  <View style={styles.card}>
    <Image source={{ uri: article.Image_link }} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{article.Headline}</Text>
    <Text style={styles.cardSummary}>{article.Summary}</Text>
  </View>
);

const ScrollCard = () => {
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setArticles(data.news))
      .catch((error) => console.error(error));
  }, []);

  const handleScroll = ({ nativeEvent }) => {
    const currentIndex = Math.round(
      nativeEvent.contentOffset.y / SCREEN_HEIGHT
    );
    if (currentIndex !== index) {
      setIndex(currentIndex);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={articles}
        renderItem={({ item }) => <Card article={item} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        style={{ height: SCREEN_HEIGHT }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  logo: {
    height: 40,
    width: "30%",
  },
  card: {
    height: SCREEN_HEIGHT,
    // paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardSummary: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ScrollCard;
