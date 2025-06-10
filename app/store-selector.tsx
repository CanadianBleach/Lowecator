import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function StoreSelectorScreen() {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const url = `https://www.google.com/maps/search/?api=1&query=Lowes&query_place_id=&center=${latitude},${longitude}`;
      setMapUrl(url);
      setLoading(false);
    })();
  }, []);

  if (loading || !mapUrl) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <iframe
          src={mapUrl}
          style={{ width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <WebView source={{ uri: mapUrl }} style={{ width: '100%', height: '100%' }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
