import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList, StyleSheet } from 'react-native';

const dummyCart = [
  { id: '1', name: 'Hammer', price: 12.99 },
  { id: '2', name: 'Screwdriver Set', price: 19.99 },
];

export default function CartScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Cart
      </ThemedText>

      <FlatList
        data={dummyCart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedText style={styles.item}>
            {item.name} - ${item.price.toFixed(2)}
          </ThemedText>
        )}
      />

      <ThemedText style={styles.total}>
        Total: $
        {dummyCart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
  total: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
