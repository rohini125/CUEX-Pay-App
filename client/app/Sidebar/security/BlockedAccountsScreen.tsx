// screens/BlockedAccountsScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BlockedAccountsScreen = () => {
  const [blockedAccounts, setBlockedAccounts] = useState([
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Alice Johnson" },
  ]);

  const unblockAccount = (id: string) => {
    Alert.alert("Unblock", "Do you want to unblock this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Unblock",
        style: "destructive",
        onPress: () =>
          setBlockedAccounts((prev) =>
            prev.filter((account) => account.id !== id)
          ),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blocked Accounts</Text>
      <FlatList
        data={blockedAccounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => unblockAccount(item.id)}>
              <Ionicons name="close-circle" size={24} color="#e53935" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, textAlign: "center" }}>
            No blocked accounts.
          </Text>
        }
      />
    </View>
  );
};

export default BlockedAccountsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  name: { fontSize: 16 },
});
