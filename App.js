import { Dimensions, StyleSheet, View } from "react-native";
import Header from "./src/components/Header";
import NewsScreen from "./src/screens/NewsScreen";
import Bottom from "./src/components/Bottom";
const WINDOW_WIDTH = Dimensions.get("window").width;
export default function App() {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <NewsScreen />
      </View>
      <Bottom />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: WINDOW_WIDTH,
    paddingHorizontal: 10,
  },
});
