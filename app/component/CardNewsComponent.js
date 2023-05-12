import { useState } from "react";

const NewsCard = ({ item }) => {
  const [height, setHeight] = useState(0);

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

  const handleTextLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Image style={styles.image} source={{ uri: item.Image_link }} />
      <View style={styles.contentContainer}>
        <Text>{new Date(item.Created_at).toLocaleDateString()}</Text>
        <TouchableOpacity style={getButtonStyle()}>
          <Text style={styles.buttonText}>{item?.Sentiment}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text
          onLayout={handleTextLayout}
          style={{ marginBottom: 5 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Published by:{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() =>
              Linking.openURL(item?.Link).catch((err) =>
                console.error("Failed to open link:", err)
              )
            }
          >
            {item?.Domain}
          </Text>
        </Text>
        <TouchableOpacity>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={[styles.textContainer, { height: ITEM_HEIGHT - height - 308 }]}
      >
        <Text onLayout={handleTextLayout} style={styles.headline}>
          {item.Headline}
        </Text>
        <Text onLayout={handleTextLayout} style={styles.summary}>
          {item.Summary}
        </Text>
      </View>
    </View>
  );
};
