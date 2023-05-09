import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = Dimensions.get("window").height;

const NewsScrollApp4 = () => {
  const [data, setData] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  // const ITEM_HEIGHT = Dimensions.get("window").height;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://askfundu.com:5000/get-all-news");
        const json = await response.json();
        setData(json.news);
      } catch (error) {
        console.error(error);
      }
    };
    console.log("hello there", ITEM_HEIGHT);
    fetchNews();
  }, []);

  const getItemLayout = (data, index) => {
    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
  };

  const renderNewsItem = ({ item, index }) => {
    const inputRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 2)];
    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [ITEM_HEIGHT, ITEM_HEIGHT, 0, 0],
    });

    return (
      <Animated.View
        style={[styles.cardContainer, { transform: [{ translateY }] }]}
      >
        <View style={styles.card}>
          <Image source={{ uri: item.Image_link }} style={styles.cardImage} />
          <Text style={styles.cardHeadline}>{item.Headline}</Text>
          <Text style={styles.cardSummary}>{item.Summary}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    height: 759,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    width: "90%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  cardHeadline: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  cardSummary: {
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default NewsScrollApp4;
