import { FlatList, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

const WINDOW_HEIGHT = Dimensions.get("window").height - 60;
const WINDOW_WIDTH = Dimensions.get("window").width;

const NewsScreen = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    let res = await fetch(`https://askfundu.com:5000/get-all-news`);
    let data = await res.json();
    setNews(data.news);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <FlatList
      data={news}
      renderItem={NewsCard}
      keyExtractor={(item) => item._id}
      pagingEnabled={true}
      snapToInterval={WINDOW_HEIGHT}
      decelerationRate={"fast"}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: WINDOW_WIDTH,
    paddingTop: 25,
  },
});

export default NewsScreen;
