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
    <Image style={styles.image} source={{ uri: article.Image_link }} />
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{article.Headline}</Text>
      <Text style={styles.summary}>{article.Summary}</Text>
    </View>
  </View>
);

const NewsCard7 = () => {
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
            uri: "https://cdn.pixabay.com/photo/2016/10/25/22/55/lion-1776755_960_720.png",
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
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

export default NewsCard7;
