import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

type Product = {
  id: string;
  name: string;
  price: number;
  aisle: string;
  row: string;
};

const dummyProducts: Product[] = [
  { id: "1", name: "Hammer", price: 12.99, aisle: "A1", row: "3" },
  { id: "2", name: "Drill", price: 59.99, aisle: "A2", row: "1" },
  { id: "3", name: "Screwdriver Set", price: 19.99, aisle: "A1", row: "4" },
  { id: "4", name: "Paint Roller", price: 8.99, aisle: "B3", row: "2" },
  { id: "5", name: "Tape Measure", price: 14.99, aisle: "B1", row: "5" },
  { id: "6", name: "Power Saw", price: 89.99, aisle: "C2", row: "1" },
  { id: "7", name: "Pliers", price: 9.99, aisle: "A3", row: "3" },
  { id: "8", name: "Utility Knife", price: 6.49, aisle: "A4", row: "2" },
  { id: "9", name: "Nails (box)", price: 4.99, aisle: "B2", row: "4" },
  { id: "10", name: "Toolbox", price: 39.99, aisle: "C1", row: "3" },
];

export default function StoreProductsScreen() {
  const { name, lat, lng } = useLocalSearchParams();

  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.storeName}>
        {name}
      </ThemedText>
      <FlatList
        data={dummyProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <ThemedView style={styles.productItem}>
            <ThemedText>{item.name}</ThemedText>
            <ThemedText>Price: ${item.price.toFixed(2)}</ThemedText>
            <ThemedText>
              Aisle: {item.aisle}, Row: {item.row}
            </ThemedText>
            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={styles.button}
            >
              <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => router.push("/cart")}
      >
        <Ionicons name="cart" size={24} color="white" />
        {cart.length > 0 && (
          <ThemedView style={styles.cartBadge}>
            <ThemedText style={styles.cartBadgeText}>{cart.length}</ThemedText>
          </ThemedView>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 14, // key for vertical centering
  },
  cartButton: {
    position: "absolute",
    bottom: 40,
    left: 40,
    backgroundColor: "#0a7ea4",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  grid: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },

  productItem: {
    width: "48%",
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "#000", // or use `useThemeColor` if you want dynamic
  },
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
  button: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    alignItems: "center",
  },
  storeName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
