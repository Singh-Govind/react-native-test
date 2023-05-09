import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

const NewsScrollApp2 = () => {
  const [news, setNews] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("https://askfundu.com:5000/get-all-news");
      const newsData = await response.json();
      setNews(newsData.news);
    } catch (error) {
      console.error(error);
    }
  };

  const getItemLayout = (data, index) => ({
    length: Dimensions.get("window").height,
    offset: Dimensions.get("window").height * index,
    index,
  });

  const cardWidth = Dimensions.get("window").width - 40;
  const cardHeight = Dimensions.get("window").height - 100;
  const containerWidth = cardWidth + 20;
  const containerHeight = cardHeight + 20;

  const translateY = scrollX.interpolate({
    inputRange: [-1, 0, cardHeight, cardHeight + 1],
    outputRange: [0, 0, -cardHeight, -cardHeight],
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        pagingEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        scrollEventThrottle={16}
      >
        {news.map((item, index) => {
          const inputRange = [
            (index - 1) * cardHeight,
            index * cardHeight,
            (index + 1) * cardHeight,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.cardContainer,
                {
                  width: containerWidth,
                  height: containerHeight,
                  transform: [{ translateY }],
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.card,
                  {
                    width: cardWidth,
                    height: cardHeight,
                    transform: [{ scale }],
                  },
                ]}
              >
                <Image style={styles.image} source={{ uri: item.Image_link }} />
                <Text style={styles.headline}>headline</Text>
                <Text style={styles.summary}>{item.Summary}</Text>
              </Animated.View>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  headline: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default NewsScrollApp2;
