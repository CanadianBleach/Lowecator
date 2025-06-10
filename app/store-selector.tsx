import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type Store = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

const stores: Store[] = [
  {
    id: "1",
    name: "Lowe's of Athens, GA",
    lat: 33.9382,
    lng: -83.4176,
  },
  {
    id: "2",
    name: "Lowe's of Winder, GA",
    lat: 33.9932,
    lng: -83.7093,
  },
];

export default function StoreSelectorScreen() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Always call hooks unconditionally
  useEffect(() => {
    if (Platform.OS !== "web") {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      })();
    }
  }, []);

  const confirmStore = () => {
    setShowModal(false);
    router.push({
      pathname: "/store-products",
      params: {
        name: selectedStore?.name,
        lat: String(selectedStore?.lat),
        lng: String(selectedStore?.lng),
      },
    });
  };

  // Web fallback: show iframe Google Map instead of native map
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <iframe
          src="https://www.google.com/maps/search/?api=1&query=Lowes+near+Athens,+GA"
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      </View>
    );
  }

  // Native: show loader until location is ready
  if (!userLocation) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          ...userLocation,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        <Marker
          coordinate={userLocation}
          title="You are here"
          pinColor="blue"
        />

        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{ latitude: store.lat, longitude: store.lng }}
            title={store.name}
            onPress={() => {
              setSelectedStore(store);
              setShowModal(true);
            }}
          />
        ))}
      </MapView>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Confirm location for:</Text>
            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
              {selectedStore?.name}
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setShowModal(false)}
                style={styles.button}
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmStore} style={styles.button}>
                <Text>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    padding: 10,
  },
});
