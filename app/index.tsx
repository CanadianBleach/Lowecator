
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';


export default function HomeScreen() {
   const buttonBg = useThemeColor({}, "buttonBackground"); // Custom theme color
  const textColor = useThemeColor({}, "text"); // Auto theme text color

  const handleGetStarted = () => {
    router.push("/store-selector");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Lowecator
      </ThemedText>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonBg }]}
        onPress={handleGetStarted}
      >
        <ThemedText style={[styles.buttonText, { color: textColor }]}>
          Get Started
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
  },
});

