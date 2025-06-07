

import React from "react";
import { StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";


const TabRoot = () => {
  return (
   
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: { backgroundColor: "#000000" },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="front"
          options={{
            title: " Home ",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: " Market ",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="line-chart" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="wallet"
          options={{
            title: " Wallet ",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={24} name="wallet" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: " History ",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="history" color={color} />
            ),
          }}
        />
      </Tabs>
  
  );
};

export default TabRoot;

const styles = StyleSheet.create({
  scanner: {
    backgroundColor: "blue",
    color: "white",
    padding: 8,
    borderRadius: "50%",
    marginBottom: 25,
  },
});


