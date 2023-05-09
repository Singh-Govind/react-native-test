import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = Dimensions.get("window").height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const NewsScrollApp5 = () => {
  const [news, setNews] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetch("https://askfundu.com:5000/get-all-news")
      .then((response) => response.json())
      .then((data) => {
        setNews(data.news);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    const inputRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 2)];
    const opacityInputRange = [
      -1,
      0,
      ITEM_HEIGHT * index,
      ITEM_HEIGHT * (index + 0.5),
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={{ ...styles.newsContainer, transform: [{ scale }], opacity }}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.Image_link }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headline}>{item.Headline}</Text>
          <Text style={styles.summary}>{item.Summary}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        scrollEventThrottle={16}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  newsContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    position: "absolute",
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    color: "#777",
  },
});

export default NewsScrollApp5;
