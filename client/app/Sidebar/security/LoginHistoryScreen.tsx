import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

interface LoginHistoryItem {
  id: string;
  date: string;
  device: string;
}

const LoginHistoryScreen = () => {
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([
    { id: "1", date: "2025-04-01 10:45 AM", device: "iPhone 12" },
 
  ]);

  const router = useRouter();

  const handleLoginHistoryItemPress = (item: LoginHistoryItem) => {
    Alert.alert("Login Details", `Date: ${item.date}\nDevice: ${item.device}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login History</Text>

      <FlatList
        data={loginHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.historyItem}
            onPress={() => handleLoginHistoryItemPress(item)}
          >
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyDevice}>{item.device}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()} // Navigate back to previous screen
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    marginBottom: 30,
  },
  historyItem: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, // For shadow effect
  },
  historyDate: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  historyDevice: {
    fontSize: 14,
    color: "#777",
  },
  backButton: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
