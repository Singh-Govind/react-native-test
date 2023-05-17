import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  Image,
  Share,
} from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { AppContext } from "../context/AppContext";

const WINDOW_HEIGHT = Dimensions.get("window").height - 60;

const NewsCard = ({ item }) => {
  const { handleWebViewSettings } = useContext(AppContext);

  // this is for getting button style
  const getButtonStyle = () => {
    if (item?.Sentiment === "Positive") {
      return [styles.button, styles.positive];
    } else if (item?.Sentiment === "Negative") {
      return [styles.button, styles.negative];
    } else if (item?.Sentiment === "Neutral") {
      return [styles.button, styles.neutral];
    }
    return styles.button;
  };

  const shareContent = async (link, title) => {
    try {
      const result = await Share.share({
        message: `Check out this link: ${link}`,
        url: "link",
        title: "title",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log("result shared", result);
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      console.log("Error sharing:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.Image_link }} />
      <View style={styles.contentContainer}>
        <Text>{new Date(item.Created_at).toLocaleDateString()}</Text>
        <TouchableOpacity style={getButtonStyle()}>
          <Text style={styles.buttonText}>{item?.Sentiment}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text>
          Published by:{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => {
              handleWebViewSettings(item?.Link);
              // Linking.openURL(item?.Link).catch((err) =>
              //   console.error("Failed to open link:", err)
              // );
            }}
          >
            {item?.Domain}
          </Text>
        </Text>
        <TouchableOpacity
          onPress={() =>
            shareContent(`https://askfundu.com/news/${item._id}`, item.Headline)
          }
        >
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headline}>{item.Headline}</Text>
        <Text style={styles.summary}>{item.Summary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    height: WINDOW_HEIGHT,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 16,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 25,
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#333",
    marginBottom: 8,
  },
  summary: {
    // flex: 1,
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#666",
    textAlign: "justify",
  },
  contentContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2196f3", // Button background color
    borderRadius: 5,
    width: 60,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff", // Button text color
    fontSize: 12,
    fontWeight: "bold",
  },
  positive: {
    backgroundColor: "#4caf50", // Positive sentiment color
  },
  negative: {
    backgroundColor: "#f44336", // Negative sentiment color
  },
  neutral: {
    backgroundColor: "#2196f3", // Neutral sentiment color
  },
});

export default NewsCard;
