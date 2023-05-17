import { FlatList, StyleSheet, Dimensions, Share } from "react-native";
import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

const WINDOW_HEIGHT = Dimensions.get("window").height - 60;
const WINDOW_WIDTH = Dimensions.get("window").width;

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchNews = async () => {
    setLoading(true);
    let res = await fetch(
      `https://askfundu.com:5000/get-all-news?pageSize=10&pageNo=${page}`
    );
    let data = await res.json();
    setNews([...news, ...data.news]);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  const handleEndReached = () => {
    const lastItemIndex = news[news.length - 1].index;
    if (!loading) {
      setPage(page + 1);
    }
  };

  return (
    <FlatList
      data={news}
      renderItem={({ item }) => <NewsCard item={item} />}
      keyExtractor={(item) => item._id}
      pagingEnabled={true}
      snapToInterval={WINDOW_HEIGHT}
      decelerationRate={"fast"}
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
  },
});

export default NewsScreen;
