import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, Text, StyleSheet } from "react-native";

const NewsScrollApp = () => {
  const [news, setNews] = useState([]);

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

  return (
    <ScrollView pagingEnabled>
      {news.map((item, index) => (
        <View style={styles.card} key={index}>
          <Image style={styles.image} source={{ uri: item.Image_link }} />
          <Text style={styles.headline}>{item.Headline}</Text>
          <Text style={styles.summary}>{item.Summary}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexGrow: 1,
    height: "100%",
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  headline: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  summary: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default NewsScrollApp;
