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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const ITEM_HEIGHT =
  Dimensions.get("window").height -
  Math.floor(Dimensions.get("window").height * 0.1) -
  (StatusBar.currentHeight || 0);

const NewsCard = ({ item }) => {
  const [height, setHeight] = useState(0);

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

  const handleTextLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Image style={styles.image} source={{ uri: item.Image_link }} />
      <View style={styles.contentContainer}>
        <Text>{new Date(item.Created_at).toLocaleDateString()}</Text>
        <TouchableOpacity style={getButtonStyle()}>
          <Text style={styles.buttonText}>{item?.Sentiment}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text
          onLayout={handleTextLayout}
          style={{ marginBottom: 5 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
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
      <View
        style={[styles.textContainer, { height: ITEM_HEIGHT - height - 308 }]}
      >
        <Text onLayout={handleTextLayout} style={styles.headline}>
          {item.Headline}
        </Text>
        <Text onLayout={handleTextLayout} style={styles.summary}>
          {item.Summary}
        </Text>
      </View>
    </View>
  );
};

const NewsScrollApp12 = () => {
  const [news, setNews] = useState([]);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("https://askfundu.com:5000/get-all-news");
      const data = await response.json();
      setNews(data.news);
    };
    fetchNews();
  }, []);

  const handleScroll = ({ nativeEvent }) => {
    const currentIndex = Math.round(nativeEvent.contentOffset.y / ITEM_HEIGHT);
    if (currentIndex !== index) {
      setIndex(currentIndex);
    }
  };

  const scrollViewRef = useRef(null);

  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
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
      <FlatList
        data={news}
        ref={scrollViewRef}
        keyExtractor={(item) => item._id.toString()}
        renderItem={NewsCard}
        getItemLayout={getItemLayout}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
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

export default NewsScrollApp12;
