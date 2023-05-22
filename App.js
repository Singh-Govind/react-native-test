import {
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "./src/context/AppContext";
import WebView from "react-native-webview";
import Header from "./src/components/Header";
import NewsScreen from "./src/screens/NewsScreen";
import Bottom from "./src/components/Bottom";
import Login from "./src/components/Login";

const WINDOW_WIDTH = Dimensions.get("window").width;

export default function App() {
  const { webViewUrl, webViewOpener, handleWebViewSettings } =
    useContext(AppContext);

  return (
    <>
      <Login />
      {/* {webViewOpener ? (
        <View style={styles.webView}>
          <TouchableOpacity
            onPress={() => {
              handleWebViewSettings("https://askfundu.com");
            }}
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Ionicons name="arrow-back" size={25} color="gray" />
            <Ionicons name="close" size={25} color="gray" />
          </TouchableOpacity>
          <WebView
            source={{ uri: webViewUrl }}
            onError={(error) => console.error("WebView error:", error)}
          />
        </View>
      ) : (
        <>
          <Header />
          <View style={styles.container}>
            <NewsScreen />
          </View>
          <Bottom />
        </>
      )} */}
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
  webView: {
    flex: 1,
    marginTop: StatusBar.length + 20,
  },
});
