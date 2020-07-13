import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    flexBasis: "100%",
  },
});

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.circle} />
    </View>
  );
}
