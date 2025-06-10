import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function StoreProductsScreen() {
  const { name, lat, lng } = useLocalSearchParams();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {name}
      </ThemedText>
      <ThemedText>Latitude: {lat}</ThemedText>
      <ThemedText>Longitude: {lng}</ThemedText>
      <ThemedText style={{ marginTop: 20 }}>Products coming soon...</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
