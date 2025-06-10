import React from "react";
import {
    Dimensions,
    Platform,
    StyleSheet,
    View
} from "react-native";
import { WebView } from "react-native-webview";

const stores = [
  { id: "1", name: "Lowe’s Downtown", lat: 37.78825, lng: -122.4324 },
  { id: "2", name: "Lowe’s Midtown", lat: 37.75825, lng: -122.4624 },
];

export default function StoreSelectorScreen() {
  const mapHeight = Dimensions.get("window").height * 0.6;
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${stores[0].lat},${stores[0].lng}`;

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <iframe
          src={mapUrl}
          style={{ width: "100%", height: "100%", border: 4 }}
        />
      ) : (
        <WebView
          source={{ uri: mapUrl }}
          style={{ width: "100%", height: mapHeight }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: "#fff",
    padding: 16,
  },
  item: {
    paddingVertical: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
