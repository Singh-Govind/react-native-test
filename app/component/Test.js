import React, { useEffect, useState } from "react";
import { Button } from "@react-native-material/core";

const Test = () => {
  const [news, setNews] = useState([]);

  return <Button title="Click Me" onPress={() => alert("🎉🎉🎉")} />;
};

export default Test;
