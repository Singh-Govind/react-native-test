import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";

const ITEM_HEIGHT =
  Dimensions.get("window").height -
  Math.floor(Dimensions.get("window").height * 0.1);

const NewsCard = ({ item }) => {
  const getButtonStyle = () => {
    if (item?.Sentiment === "Positive") {
      return [styles.button, styles.positive];
    } else if (item?.Sentiment === "Negative") {
      return [styles.button, styles.negative];
    } else if (item?.Sentiment === "Neutral") {
      return [styles.button, styles.neutral];
    }
    return styles.button;
  };

  return (
    <View
      style={{
        height: ITEM_HEIGHT,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "white",
        // transform: [{ scaleY: -1 }],
      }}
    >
      {/* <Image style={styles.image} source={{ uri: item.Image_link }} /> */}
      <View style={styles.contentContainer}>
        <Text>{new Date(item.Created_at).toLocaleDateString()}</Text>
        <TouchableOpacity style={getButtonStyle()}>
          <Text style={styles.buttonText}>{item?.Sentiment}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text>
          Published by:{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() =>
              Linking.openURL(item?.Link).catch((err) =>
                console.error("Failed to open link:", err)
              )
            }
          >
            {item?.Domain}
          </Text>
        </Text>
        <TouchableOpacity>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headline}>{item.Headline}</Text>
        <Text style={styles.summary}>{item.Summary}</Text>
      </View>
    </View>
  );
};
const NewsCard13 = () => {
  const [news, setNews] = useState([]);
  const [activeIndex, setActiveIndex] = useState();

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("https://askfundu.com:5000/get-all-news");
      const data = await response.json();
      setNews(data.news);
    };
    fetchNews();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="menu-outline" size={28} color="black" />
          <Image
            style={styles.logo}
            source={{
              uri: "https://www.askfundu.com/static/media/askfunduLogo.8d6f3f280186de132173.png",
            }}
          />
          <View></View>
        </View>
      </View>
      <View style={styles.carousel}>
        <Carousel
          layout={"stack"}
          data={news}
          sliderHeight={ITEM_HEIGHT - 15}
          itemHeight={ITEM_HEIGHT}
          renderItem={NewsCard}
          vertical={true}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.bottomMenuItem}>
          <Ionicons name="home-outline" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMenuItem}>
          <Ionicons name="search-outline" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMenuItem}>
          <Ionicons name="settings-outline" size={28} color="gray" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  carousel: {
    // flex: 1,
    // transform: [{ scaleY: -1 }],
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 2,
    marginTop: 1,
    // height: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2.22,
    // elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
    marginBottom: 10,
    marginTop: 13,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 25,
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#333",
    marginBottom: 8,
    marginTop: -4,
  },
  summary: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#666",
    textAlign: "justify",
    // marginBottom: 10,
  },
  header: {
    // height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 8,
  },
  logo: {
    width: 100,
    height: 40,
    marginLeft: -28,
  },
  bottomMenu: {
    // height: 40,
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

  contentContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
    marginTop: 10,
  },

  button: {
    backgroundColor: "#2196f3", // Button background color
    borderRadius: 5,
    width: 60,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff", // Button text color
    fontSize: 12,
    fontWeight: "bold",
  },
  positive: {
    backgroundColor: "#4caf50", // Positive sentiment color
  },
  negative: {
    backgroundColor: "#f44336", // Negative sentiment color
  },
  neutral: {
    backgroundColor: "#2196f3", // Neutral sentiment color
  },
});

export default NewsCard13;
