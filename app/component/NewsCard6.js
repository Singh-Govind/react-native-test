import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  Image,
} from "react-native";

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

const NewsScrollApp6 = () => {
  const [news, setNews] = useState([]);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("https://askfundu.com:5000/get-all-news");
      const data = await response.json();
      setNews(data.news);
      console.log("it is height", ITEM_HEIGHT);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    height: ITEM_HEIGHT,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summary: {
    fontSize: 18,
  },
});

export default NewsScrollApp6;
