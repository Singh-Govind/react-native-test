import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AllNews() {
  const [news, setNews] = useState([]);
  const callNewsApi = () => {
    fetch(`https://loose-moons-wonder.loca.lt/get-all-news`)
      .then((res) => res.json())
      .then((res) => {
        setNews(res.news);
      });
  };
  useEffect(() => {
    callNewsApi();
  }, []);
  return (
    <ScrollView pagingEnabled>
      {news.map((item, index) => (
        <View style={styles.card} key={index}>
          <Image style={styles.image} source={{ uri: item.Image_link }} />
          <Text style={styles.headline}>{item.headline}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: "100%",
    padding: 10,
    backgroundColor: "#fff",
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
