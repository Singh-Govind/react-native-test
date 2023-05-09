import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ITEM_HEIGHT = Dimensions.get("window").height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const NewsCard = ({ article }) => (
  <View style={styles.card}>
    {/* <View style={styles.image}> */}
    <Image style={styles.image} source={{ uri: article.Image_link }} />
    {/* </View> */}
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{article.Headline}</Text>
      <Text style={styles.summary}>{article.Summary}</Text>
    </View>
  </View>
);

const NewsScrollApp9 = () => {
  const [news, setNews] = useState([]);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("https://askfundu.com:5000/get-all-news");
      const data = await response.json();
      setNews(data.news);
    };
    fetchNews();
  }, []);

  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
    ];
    const opacityInputRange = [
      (index - 0.5) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 0.5) * ITEM_HEIGHT,
    ];

    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
    });

    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [0, 1, 0],
    });

    return (
      <Animated.View style={{ transform: [{ translateY }], opacity }}>
        <NewsCard article={item} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu-outline" size={28} color="white" />
        <Image
          style={styles.logo}
          source={{
            uri: "https://www.askfundu.com/static/media/askfunduLogo.8d6f3f280186de132173.png",
          }}
        />
      </View>
      <AnimatedFlatList
        data={news}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
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
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#333",
    marginBottom: 8,
  },
  summary: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#666",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 40,
  },
  bottomMenu: {
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

export default NewsScrollApp9;
