import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

const API_ENDPOINT = "https://askfundu.com:5000/get-all-news";

const NewsCard = ({ item }) => {
  const [sentimentColor, setSentimentColor] = useState("");

  useEffect(() => {
    const sentiment = item.sentiment;
    if (sentiment === "positive") {
      setSentimentColor("green");
    } else if (sentiment === "neutral") {
      setSentimentColor("blue");
    } else {
      setSentimentColor("red");
    }
  }, [item]);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => console.log("View article")}
    >
      <Image source={{ uri: item.Image_link }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardDate}>{item.date}</Text>
        <View style={styles.sentimentContainer}>
          <TouchableOpacity
            style={[
              styles.sentimentButton,
              { backgroundColor: sentimentColor },
            ]}
          />
          <Text style={styles.cardDomain}>{item.domain}</Text>
        </View>
        <Text style={styles.cardHeadline}>{item.Headline}</Text>
        <Text style={styles.cardSummary}>{item.Summary}</Text>
      </View>
    </TouchableOpacity>
  );
};

const NewsCard14 = () => {
  const [newsData, setNewsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setNewsData(data.news))
      .catch((error) => console.error(error));
  }, []);

  const renderNewsCard = ({ item, index }) => (
    <NewsCard item={item} index={index} />
  );

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={newsData}
        renderItem={renderNewsCard}
        sliderWidth={400}
        itemWidth={300}
        onSnapToItem={(index) => setActiveIndex(index)}
        vertical={true}
      />
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Navigate to home page")}
        >
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Navigate to search page")}
        >
          <Text>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Navigate to settings page")}
        >
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  cardDate: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  sentimentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  sentimentButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  cardDomain: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
  },
  cardHeadline: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSummary: {
    fontSize: 14,
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F5FCFF",
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
  },
});

export default NewsCard14;
