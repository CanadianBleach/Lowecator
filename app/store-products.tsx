import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

export default function StoreProductsScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://www.lowes.com/" }}
        style={styles.webview}
        startInLoadingState
        javaScriptEnabled
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => console.log("Save Item button pressed")}
      >
        <Text style={styles.buttonText}>Save Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  saveButton: {
    position: "absolute",
    bottom: 8,
    right: 15,
    backgroundColor: "#1e90ff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    zIndex: 10,
    elevation: 5,
    width: 237,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
